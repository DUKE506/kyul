export const StockDeepAnalysis = ({
  name,
  aiOpinion,
  targetPrice,
  desc,
}: any) => (
  <div className="bg-bg-surface border-2 border-accent/30 rounded-3xl p-6 space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-text-primary font-bold text-lg">{name} 상세 분석</h3>
      <span
        className={`px-3 py-1 rounded-full text-xs font-black ${
          aiOpinion === "BUY" ? "bg-up/20 text-up" : "bg-warn/20 text-warn"
        }`}
      >
        AI 의견: {aiOpinion}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 bg-bg-base/50 p-4 rounded-2xl">
      <div>
        <p className="text-[10px] text-text-muted uppercase font-bold">
          예상 목표가
        </p>
        <p className="text-text-primary font-bold">{targetPrice} KRW</p>
      </div>
      <div>
        <p className="text-[10px] text-text-muted uppercase font-bold">
          분석 신뢰도
        </p>
        <p className="text-accent font-bold">High (92%)</p>
      </div>
    </div>

    <p className="text-sm text-text-secondary leading-relaxed italic">
      "{desc}"
    </p>
  </div>
);
