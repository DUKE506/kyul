import { ImpactProps } from "@/types/analysis";

export const ImpactCard = ({
  title,
  stock,
  relevance,
  sentiment,
  desc,
}: ImpactProps) => (
  <div className="bg-bg-surface border border-border-main p-6 rounded-2xl hover:border-border-subtle transition-colors group">
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-text-primary font-bold group-hover:text-accent transition-colors">
        {title}
      </h4>
      <div
        className={`text-[10px] px-2 py-0.5 rounded border ${
          sentiment === "good"
            ? "bg-badge-good-bg text-up border-up/20"
            : "bg-badge-warn-bg text-warn border-warn/20"
        }`}
      >
        {sentiment.toUpperCase()}
      </div>
    </div>
    <div className="flex gap-4 items-center mb-4">
      <span className="text-xs text-text-muted">
        관련 종목: <b className="text-text-secondary">{stock}</b>
      </span>
      <span className="text-xs text-text-muted">
        연관성: <b className="text-accent">{relevance}</b>
      </span>
    </div>
    <p className="text-sm text-text-secondary leading-relaxed bg-bg-base/50 p-4 rounded-xl italic">
      {desc}
    </p>
  </div>
);
