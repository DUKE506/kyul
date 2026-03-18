export const EmptyPortfolio = () => (
  <div className="bg-bg-surface border border-dashed border-border-main rounded-3xl p-16 text-center space-y-4">
    <div className="text-4xl">🌊</div>
    <div className="space-y-1">
      <h3 className="text-text-primary font-bold text-lg">
        아직 등록된 자산의 결이 없습니다.
      </h3>
      <p className="text-text-muted text-sm">
        보유하신 종목을 등록하고 AI의 분석을 받아보세요.
      </p>
    </div>
    <button className="mt-4 px-6 py-3 bg-bg-elevated border border-accent/30 text-accent rounded-full text-sm font-bold hover:bg-accent hover:text-bg-base transition-all">
      첫 종목 등록하기
    </button>
  </div>
);
