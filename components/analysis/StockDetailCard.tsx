import React from "react";
import { StockDetailAnalysis } from "@/types/analysis";

export const StockDetailCard = ({
  stock,
  technicalScore,
  fundamentalScore,
  aiOpinion,
  targetPrice,
  desc,
}: StockDetailAnalysis) => {
  // 점수에 따른 게이지 색상 결정 로직
  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--color-up)";
    if (score >= 50) return "var(--color-warn)";
    return "var(--color-down)";
  };

  return (
    <div className="bg-bg-surface border border-border-main rounded-[2rem] p-8 space-y-8 shadow-xl">
      {/* 헤더: 종목명 및 AI 의견 */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-text-primary text-2xl font-bold tracking-tight">
            {stock}
          </h3>
          <p className="text-text-muted text-sm mt-1 uppercase tracking-widest font-medium">
            Deep Analysis
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-xl font-black text-sm border ${
            aiOpinion === "BUY"
              ? "bg-badge-good-bg text-up border-up/20"
              : aiOpinion === "SELL"
                ? "bg-badge-down-bg text-down border-down/20"
                : "bg-badge-warn-bg text-warn border-warn/20"
          }`}
        >
          {aiOpinion}
        </div>
      </div>

      {/* 점수 영역: 기술 vs 기본 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { label: "Technical (차트 결)", score: technicalScore },
          { label: "Fundamental (기업 가치)", score: fundamentalScore },
        ].map((item) => (
          <div key={item.label} className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-text-secondary text-xs font-bold">
                {item.label}
              </span>
              <span className="text-text-primary font-mono font-bold">
                {item.score}%
              </span>
            </div>
            <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-700 ease-out"
                style={{
                  width: `${item.score}%`,
                  backgroundColor: getScoreColor(item.score),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 목표가 및 결 분석 내용 */}
      <div className="bg-bg-base/50 border border-border-subtle rounded-2xl p-6 space-y-3">
        <div className="flex justify-between items-center border-b border-border-subtle pb-3">
          <span className="text-text-muted text-xs font-bold uppercase">
            AI Target Price
          </span>
          <span className="text-accent font-bold">{targetPrice} KRW</span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed italic pt-2">
          "{desc}"
        </p>
      </div>
    </div>
  );
};
