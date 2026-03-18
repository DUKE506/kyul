import { getPortfolio } from "@/lib/actions/stock-actions";
import HomePageClient from "./HomePageClient"; // 아래에서 만들 파일

export default async function Page() {
  // 서버 액션을 통해 DB에서 직접 데이터를 가져옵니다.
  const portfolio = await getPortfolio();

  return <HomePageClient portfolio={portfolio} />;
}
