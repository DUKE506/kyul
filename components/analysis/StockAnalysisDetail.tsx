import { StockDetailAnalysis } from "@/types/analysis";

export const StockAnalysisDetail = ({
  technicalScore,
  fundamentalScore,
  aiOpinion,
  targetPrice,
  stock,
}: StockDetailAnalysis) => {
  return (
    <div className="bg-bg-surface border border-border-main rounded-3xl p-8 space-y-8">
      {/* 상단: 종목명 및 목표가 */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">
            {stock} 분석 결
          </h2>
          <p className="text-text-primary text-2xl font-black">
            AI 목표가: {targetPrice}원
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-xl font-black text-sm ${
            aiOpinion === "BUY"
              ? "bg-badge-good-bg text-up"
              : "bg-badge-down-bg text-down"
          }`}
        >
          {aiOpinion}
        </div>
      </div>

      {/* 중앙: 점수 시각화 (동희님의 색상 체계 활용) */}
      <div className="grid grid-cols-2 gap-6">
        <ScoreGauge
          label="기술적 지표"
          score={technicalScore}
          color="var(--color-accent)"
        />
        <ScoreGauge
          label="기본적 분석"
          score={fundamentalScore}
          color="var(--color-up)"
        />
      </div>

      {/* 하단: AI 제언 (desc 활용) */}
      <div className="bg-bg-base/50 p-5 rounded-2xl border border-border-subtle">
        <p className="text-sm text-text-secondary leading-relaxed italic">
          "현재 차트상의 결이 정배열로 전환되었습니다. 기본적 펀더멘탈 점수도
          우수하므로 목표가까지 홀딩하는 결을 추천합니다."
        </p>
      </div>
    </div>
  );
};

// 작은 게이지 컴포넌트
const ScoreGauge = ({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
      <span>{label}</span>
      <span style={{ color }}>{score}점</span>
    </div>
    <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
      <div
        className="h-full transition-all duration-1000"
        style={{ width: `${score}%`, backgroundColor: color }}
      />
    </div>
  </div>
);
