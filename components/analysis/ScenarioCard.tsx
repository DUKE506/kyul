interface ScenarioProps {
  type: string; // 예: 'Aggressive', 'Defensive'
  title: string; // 예: '불타기 전략'
  content: string; // 상세 분석 내용
}
export const ScenarioCard = ({ type, title, content }: ScenarioProps) => (
  <div className="bg-bg-elevated/30 border border-border-main p-6 rounded-2xl hover:bg-bg-elevated transition-all">
    <span className="text-[10px] text-accent font-bold tracking-widest mb-2 block">
      {type}
    </span>
    <h4 className="text-text-primary font-bold mb-2">{title}</h4>
    <p className="text-xs text-text-muted leading-relaxed">{content}</p>
  </div>
);
