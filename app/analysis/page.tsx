"use client";

import React from "react";
import { ImpactCard } from "@/components/analysis/ImpactCard";
import { ScenarioCard } from "@/components/analysis/ScenarioCard";
import { StockDetailCard } from "@/components/analysis/StockDetailCard";
import { StockDetailAnalysis } from "@/types/analysis"; // 타입 임포트

export default function AnalysisPage() {
  // 실제 데이터 구조를 따르는 Mock 데이터
  const hynixAnalysis: StockDetailAnalysis = {
    stock: "SK하이닉스",
    technicalScore: 85,
    fundamentalScore: 72,
    aiOpinion: "BUY",
    targetPrice: "210,000",
    sentiment: "good",
    relevance: "High",
    title: "반도체 업황 턴어라운드",
    desc: "최근 HBM 수요 급증으로 인한 기술적 정배열 구간 진입이 뚜렷합니다. 기본적 이익 체력 또한 개선되고 있어 공격적인 결을 유지해도 좋은 시점입니다.",
  };

  return (
    <div className="min-h-screen px-6 pt-16 pb-32 max-w-3xl mx-auto space-y-16">
      {/* 1. 페이지 헤더 */}
      <header className="text-center space-y-4">
        <h1 className="text-text-primary text-4xl font-black tracking-tighter">
          AI 결 분석 리포트
        </h1>
        <p className="text-text-muted text-base">
          실시간 뉴스데이터와 포트폴리오를 대조하여 최적의 대응 결을 제안합니다.
        </p>
      </header>

      {/* 2. 포트폴리오 점수 섹션 */}
      <section className="bg-bg-surface border border-border-main rounded-[2.5rem] p-10 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50" />
        <div className="relative z-10 space-y-6">
          <span className="px-4 py-1.5 bg-badge-good-bg text-badge-good-text rounded-full text-xs font-black uppercase tracking-widest">
            Excellent Status
          </span>
          <div className="text-7xl font-black text-text-primary tracking-tighter">
            88<span className="text-2xl text-text-muted">/100</span>
          </div>
          <p className="text-text-secondary font-medium">
            반도체 섹터의 강세가 포트폴리오의 안정성을 높이고 있습니다.
          </p>
        </div>
      </section>

      {/* 3. 집중 분석 종목 섹션 (섹션 타이틀 보완) */}
      <section className="space-y-6">
        <h3 className="text-text-secondary font-bold text-lg border-l-4 border-accent pl-4 uppercase tracking-widest text-sm">
          Focused Analysis
        </h3>
        <StockDetailCard {...hynixAnalysis} />
      </section>

      {/* 4. 뉴스 임팩트 리스트 */}
      <section className="space-y-8">
        <h3 className="text-text-secondary font-bold text-lg border-l-4 border-accent pl-4 uppercase tracking-widest text-sm">
          Market News Impact
        </h3>
        <div className="space-y-4">
          <ImpactCard
            title="엔비디아 HBM3E 공급 확대 소식"
            stock="SK하이닉스"
            relevance="높음"
            sentiment="good"
            desc="주요 공급사로서 수혜가 예상됩니다."
          />
          <ImpactCard
            title="미국 금리 인하 기대감 축소"
            stock="성장주 전반"
            relevance="보통"
            sentiment="warn"
            desc="현금 비중 확보를 추천합니다."
          />
        </div>
      </section>

      {/* 5. 하단 행동 지침 */}
      <section className="bg-bg-elevated border border-border-main rounded-3xl p-8 space-y-6">
        <h3 className="text-text-primary font-bold flex items-center gap-2">
          ✨ Recommended Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScenarioCard
            type="Aggressive"
            title="불타기 (추가 매수)"
            content="추세가 견고합니다. 5% 내외 추가 진입을 고려하세요."
          />
          <ScenarioCard
            type="Defensive"
            title="익절 및 현금화"
            content="일부 고점 신호가 보입니다. 10% 현금화를 추천합니다."
          />
        </div>
      </section>
    </div>
  );
}
