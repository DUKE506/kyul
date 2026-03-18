import YahooFinance from "yahoo-finance2";

// 1. 공식 문서 가이드대로 인스턴스 생성
const yahooFinance = new YahooFinance();

export async function getLivePrice(ticker: string) {
  let symbol = ticker.toUpperCase();

  // 1. 티커가 숫자로만 이루어져 있다면 한국 주식으로 판단
  const isKoreanStock = /^\d+$/.test(ticker);

  if (isKoreanStock && !ticker.includes(".")) {
    symbol = `${ticker}.KS`; // 기본 코스피
  }

  try {
    const quote: any = await yahooFinance.quote(symbol);

    // 2. 코스피로 실패 시 코스닥(.KQ) 재시도 (숫자 티커인 경우만)
    if (!quote && isKoreanStock && symbol.endsWith(".KS")) {
      const kqQuote: any = await yahooFinance.quote(`${ticker}.KQ`);
      if (kqQuote) return formatQuote(kqQuote);
    }

    if (!quote) return null;
    return formatQuote(quote);
  } catch (error) {
    console.error(`[Yahoo Finance] ${symbol} 조회 실패:`, error);
    return null;
  }
}

// 중복 코드 방지를 위한 포맷터 함수
function formatQuote(quote: any) {
  return {
    price: quote.regularMarketPrice || 0,
    changeRate: quote.regularMarketChangePercent || 0,
    isUp: (quote.regularMarketChangePercent || 0) > 0,
    currency: quote.currency || "KRW", // 통화 정보 추가 (USD/KRW 구분용)
  };
}

/**
 * --------------------------------------------------
 * 실시간 USD/KRW 환율 조회
 * @returns
 * --------------------------------------------------
 */
export async function getExchangeRate(): Promise<number> {
  try {
    // Yahoo Finance에서 환율 티커는 'USDKRW=X'입니다.
    const quote: any = await yahooFinance.quote("USDKRW=X");
    return quote?.regularMarketPrice || 1350; // 실패 시 대비한 기본값(Fallback)
  } catch (error) {
    console.error("[Exchange Rate] 환율 조회 실패:", error);
    return 1350; // 통상적인 평균 환율
  }
}
