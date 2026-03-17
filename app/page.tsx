import { PortfolioCard } from "@/components/dashboard/PortfolioCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 md:p-10 space-y-10">
      {/* 상단 헤더 영역 */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-text-muted text-sm font-medium mb-1">
            내 자산의 결
          </h1>
          <p className="text-text-primary text-4xl font-extrabold tracking-tighter">
            124,500,000{" "}
            <span className="text-xl font-normal text-text-muted">KRW</span>
          </p>
        </div>
        <button className="bg-bg-elevated text-accent border border-border-main px-4 py-2 rounded-xl text-sm font-bold hover:border-accent transition-colors">
          종목 추가 +
        </button>
      </header>

      {/* 메인 콘텐츠 영역 (Bento Grid) */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 좌측: 보유 주식 리스트 */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-text-secondary font-bold">보유 종목</h2>
            <span className="text-text-muted text-xs">
              최근 업데이트: 방금 전
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PortfolioCard
              name="삼성전자"
              ticker="005930"
              price="74,200"
              changeRate={1.2}
              isUp={true}
            />
            <PortfolioCard
              name="SK하이닉스"
              ticker="000660"
              price="182,100"
              changeRate={2.4}
              isUp={false}
            />
            <PortfolioCard
              name="NAVER"
              ticker="035420"
              price="195,000"
              changeRate={0.5}
              isUp={true}
            />
            <PortfolioCard
              name="카카오"
              ticker="035720"
              price="48,200"
              changeRate={3.1}
              isUp={false}
            />
          </div>
        </section>

        {/* 우측: AI 인사이트 & 인기 결 (Side Bar) */}
        <aside className="space-y-8">
          <section className="bg-bg-surface border border-accent/20 rounded-3xl p-6 relative overflow-hidden">
            {/* 시그니처 컬러 글로우 효과 */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl rounded-full -mr-10 -mt-10" />

            <h2 className="text-accent font-bold mb-4 flex items-center gap-2">
              <span className="animate-pulse">✨</span> AI 인사이트
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              "동희님, 현재 반도체 섹터의 **결**이 매우 강합니다. 삼성전자의
              비중을 유지하며 수익 실현 시점을 고민해보세요."
            </p>
            <button className="w-full py-3 bg-accent text-bg-base font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
              전체 분석 리포트 보기
            </button>
          </section>

          <section className="space-y-4">
            <h2 className="text-text-secondary font-bold">
              인기 결 (Trending)
            </h2>
            <div className="divide-y divide-border-subtle bg-bg-surface border border-border-main rounded-2xl overflow-hidden">
              {["엔비디아", "테슬라", "애플"].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 flex justify-between items-center hover:bg-bg-elevated transition-colors"
                >
                  <span className="text-text-primary text-sm font-medium">
                    {item}
                  </span>
                  <span className="text-up text-xs font-bold">+5.2%</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
