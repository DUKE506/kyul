export type SentimentType = "good" | "warn" | "down";
export type OpinionType = "BUY" | "HOLD" | "SELL";

// 홈 화면의 종목 카드 타입
export interface StockBrief {
  name: string;
  ticker: string;
  price: string; // 현재가 (포맷팅된 문자열)
  avgPrice: string; // 평균단가 (추가)
  totalValue: string; // 평가금액 (추가: 현재가 * 수량)
  changeRate: number; // 수익률
  isUp: boolean; // 상승/하락 여부
  quantity: number; // 보유 수량 (계산용)
}

// 분석 페이지의 상세 데이터 타입
export interface StockDetailAnalysis {
  stock: string;
  technicalScore: number;
  fundamentalScore: number;
  aiOpinion: OpinionType;
  targetPrice: string;
  sentiment: SentimentType;
  relevance: string;
  title: string;
  desc: string;
}

export interface ScenarioProps {
  type: string;
  title: string;
  content: string;
}

export interface PortfolioData {
  stocks: StockBrief[];
  totalAsset: string; // 모든 종목의 원화 환산 합계
  totalProfitRate: number; // 전체 포트폴리오 수익률 (선택 사항)
}
