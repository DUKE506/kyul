"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PortfolioCard } from "@/components/dashboard/PortfolioCard";
import { AddStockModal } from "@/components/modals/AddStockModal";
import { EmptyPortfolio } from "@/components/dashboard/EmptyPortfolio";
import { Plus, ArrowRight } from "lucide-react";
import { PortfolioData, StockBrief } from "@/types/analysis";

interface HomePageClientProps {
  portfolio: PortfolioData;
}

export default function HomePageClient({ portfolio }: HomePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. 초기값으로 서버에서 넘어온 portfolio 객체 전체를 설정합니다.
  const [currentPortfolio, setCurrentPortfolio] =
    useState<PortfolioData>(portfolio);

  // 만약 서버에서 데이터가 갱신되어 props가 내려올 때 state를 동기화하고 싶다면 useEffect를 사용합니다.
  // Next.js의 revalidatePath는 보통 페이지 전체를 다시 그리지만,
  // 클라이언트 state를 안전하게 관리하기 위해 아래 구조가 권장됩니다.
  useEffect(() => {
    setCurrentPortfolio(portfolio);
  }, [portfolio]);

  return (
    <div className="min-h-screen px-6 pt-10 pb-32 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-text-muted text-sm font-bold tracking-widest uppercase">
            My 결 Asset
          </h2>
          <div className="flex items-baseline gap-3">
            {/* 이제 실제 계산된 총 자산이 표시됩니다! */}
            <span className="text-text-primary text-5xl font-black tracking-tighter">
              {portfolio.totalAsset}
            </span>
            <span className="text-text-muted text-xl font-medium uppercase">
              KRW
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 bg-accent text-bg-base px-6 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-accent/20"
        >
          <Plus size={18} strokeWidth={3} /> 종목 추가하기
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <h3 className="text-text-secondary font-bold text-lg">보유한 결</h3>
            <span className="text-text-muted text-xs">최근 갱신: 실시간</span>
          </div>

          {currentPortfolio.stocks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentPortfolio.stocks.map((stock, i) => (
                <PortfolioCard key={`${stock.ticker}-${i}`} {...stock} />
              ))}
            </div>
          ) : (
            <EmptyPortfolio />
          )}
        </section>

        <aside className="space-y-10">
          {/* AI Insight 섹션 동일 */}
          <section className="bg-bg-surface border border-accent/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h4 className="text-accent font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-ping" />{" "}
                AI Insight
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                "종목을 추가하셨군요! 이제 <b>결</b> 분석을 통해 최적의 타이밍을
                잡아보세요."
              </p>
              <Link
                href="/analysis"
                className="w-full py-3 bg-bg-elevated border border-border-main text-text-primary rounded-xl text-xs font-bold hover:bg-border-main transition-colors flex justify-center items-center gap-2"
              >
                상세 분석 보기 <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </aside>
      </div>

      <AddStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
