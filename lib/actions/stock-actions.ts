"use server";

import { createClient } from "@/utils/supabase/server"; // Supabase 서버 클라이언트 설정 필요
import { PortfolioData } from "@/types/analysis";
import { revalidatePath } from "next/cache";
import { getExchangeRate, getLivePrice } from "../api/stock-price";

/**
 * -----------------------------------------
 * Stock Get Action
 * -----------------------------------------
 */
export async function getPortfolio(): Promise<PortfolioData> {
  const supabase = await createClient();
  const exchangeRate = await getExchangeRate();

  const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data)
    return { stocks: [], totalAsset: "0", totalProfitRate: 0 };

  let totalAssetKRW = 0; // 현재 가치의 총합 (평가금)
  let totalInvestedKRW = 0; // 투자한 원금의 총합 (매수금)

  const stocks = await Promise.all(
    data.map(async (stock: any) => {
      const liveData = await getLivePrice(stock.ticker);

      const currentPrice = liveData?.price || 0;
      const avgPrice = Number(stock.avg_price) || 0;
      const quantity = Number(stock.quantity) || 0;
      const isUSD = liveData?.currency === "USD";

      // 1. 원화 환산 가격 계산
      const priceInKRW = isUSD ? currentPrice * exchangeRate : currentPrice;
      const avgPriceInKRW = isUSD ? avgPrice * exchangeRate : avgPrice;

      // 2. 합계 누적 (평가금 vs 원금)
      totalAssetKRW += priceInKRW * quantity;
      totalInvestedKRW += avgPriceInKRW * quantity;

      // 개별 종목 수익률 (통화 기준 동일하므로 환율 무관하게 계산 가능)
      const profitRate =
        avgPrice > 0 ? ((currentPrice - avgPrice) / avgPrice) * 100 : 0;

      return {
        name: stock.name,
        ticker: stock.ticker,
        price: isUSD
          ? `$${currentPrice.toLocaleString()}`
          : currentPrice.toLocaleString(),
        avgPrice: isUSD
          ? `$${avgPrice.toLocaleString()}`
          : avgPrice.toLocaleString(),
        totalValue: (priceInKRW * quantity).toLocaleString(),
        changeRate: Number(profitRate.toFixed(2)),
        isUp: profitRate >= 0,
        quantity: quantity,
      };
    }),
  );

  // 3. 전체 포트폴리오 수익률 계산
  const totalProfitRate =
    totalInvestedKRW > 0
      ? ((totalAssetKRW - totalInvestedKRW) / totalInvestedKRW) * 100
      : 0;

  return {
    stocks,
    totalAsset: totalAssetKRW.toLocaleString(),
    totalProfitRate: Number(totalProfitRate.toFixed(2)), // 이제 타입에 맞춰 반환합니다.
  };
}
/**
 * -----------------------------------------
 * Stock Add Action
 * -----------------------------------------
 */
interface AddStockParams {
  name: string;
  ticker: string;
  avgPrice: number;
  quantity: number;
}

export async function addStockAction(params: AddStockParams) {
  const supabase = await createClient();

  // 1. 현재 로그인한 유저 정보 가져오기 (인증 구현 전이라면 임시 ID 사용 가능)
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   if (!user) {
  //     throw new Error("로그인이 필요합니다.");
  //   }

  // RLS가 꺼져 있어도 user_id가 필수(NOT NULL) 컬럼이라면 값을 채워야 합니다.
  // 아직 로그인이 없으므로 임시 UUID를 할당합니다.
  const GUEST_USER_ID = "00000000-0000-0000-0000-000000000000";

  // 2. DB에 데이터 삽입
  const { error } = await supabase.from("stocks").insert({
    user_id: GUEST_USER_ID,
    name: params.name,
    ticker: params.ticker,
    avg_price: params.avgPrice,
    quantity: params.quantity,
  });

  if (error) {
    console.error("Error adding stock:", error.message);
    return { success: false, message: error.message };
  }

  // 3. 페이지 데이터 갱신 (홈 화면 캐시 무효화)
  revalidatePath("/");
  return { success: true };
}
