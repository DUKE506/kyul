import { StockBrief } from "@/types/analysis";
import React from "react";

export const PortfolioCard = ({
  name,
  ticker,
  price,
  avgPrice,
  totalValue,
  changeRate,
  isUp,
}: StockBrief) => {
  return (
    <div className="bg-bg-surface border border-border-main p-6 rounded-[2rem] hover:border-accent/40 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-text-primary font-black text-lg">{name}</h4>
          <span className="text-text-muted text-xs font-mono uppercase">
            {ticker}
          </span>
        </div>
        <div className={`text-sm font-bold ${isUp ? "text-up" : "text-down"}`}>
          {isUp ? "▲" : "▼"} {Math.abs(changeRate)}%
        </div>
      </div>

      <div className="space-y-3">
        {/* 평가금액 섹션 (가장 중요) */}
        <div className="flex justify-between items-end">
          <span className="text-text-muted text-xs font-medium">평가금액</span>
          <span className="text-text-primary font-black text-xl">
            {totalValue}{" "}
            <small className="text-[10px] text-text-muted font-normal">
              KRW
            </small>
          </span>
        </div>

        <div className="h-[1px] bg-border-subtle w-full" />

        {/* 상세 가격 정보 (현재가 vs 평단가) */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="flex flex-col">
            <span className="text-text-muted text-[10px] uppercase font-bold tracking-wider">
              Current
            </span>
            <span className="text-text-secondary font-bold text-sm">
              {price}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-text-muted text-[10px] uppercase font-bold tracking-wider">
              Average
            </span>
            <span className="text-text-secondary font-bold text-sm">
              {avgPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
