import React from "react";

interface StockProps {
  name: string;
  ticker: string;
  price: string;
  changeRate: number;
  isUp: boolean;
}

export const PortfolioCard = ({
  name,
  ticker,
  price,
  changeRate,
  isUp,
}: StockProps) => {
  return (
    <div className="group bg-bg-surface border border-border-main rounded-2xl p-5 hover:bg-bg-elevated hover:border-accent/30 transition-all duration-300 cursor-pointer shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-text-primary font-bold text-lg leading-tight">
            {name}
          </h3>
          <span className="text-text-muted text-xs font-medium uppercase tracking-wider">
            {ticker}
          </span>
        </div>
        {/* 수익률 배지: 동희님이 정의한 badge-good/down 활용 */}
        <div
          className={`px-2.5 py-1 rounded-md text-xs font-bold ${
            isUp
              ? "bg-badge-good-bg text-badge-good-text"
              : "bg-badge-down-bg text-badge-down-text"
          }`}
        >
          {isUp ? "+" : ""}
          {changeRate}%
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-text-primary tracking-tight">
          {price}{" "}
          <span className="text-sm font-normal text-text-muted">KRW</span>
        </div>
        {/* 미니 차트가 들어갈 자리 (Placeholder) */}
        <div className="h-8 w-20 bg-border-subtle rounded-md animate-pulse" />
      </div>
    </div>
  );
};
