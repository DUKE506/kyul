"use client";

import React, { useState } from "react";
import { addStockAction } from "@/lib/actions/stock-actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStockModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    avgPrice: "",
    quantity: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const result = await addStockAction({
      name: form.name,
      ticker: form.ticker,
      avgPrice: Number(form.avgPrice),
      quantity: Number(form.quantity),
    });

    if (result.success) {
      onClose();
      setForm({ name: "", ticker: "", avgPrice: "", quantity: "" });
    } else {
      alert("등록 실패: " + result.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-surface border border-border-main w-full max-w-md rounded-3xl p-8">
        <h2 className="text-text-primary text-xl font-bold mb-6 text-center">
          종목 추가
        </h2>

        <div className="space-y-4">
          <input
            placeholder="종목명"
            className="w-full bg-bg-elevated p-3 rounded-xl border border-border-main text-text-primary outline-none focus:border-accent"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="티커 (예: 005930)"
            className="w-full bg-bg-elevated p-3 rounded-xl border border-border-main text-text-primary outline-none focus:border-accent"
            value={form.ticker}
            onChange={(e) => setForm({ ...form, ticker: e.target.value })}
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="평단가"
              className="w-1/2 bg-bg-elevated p-3 rounded-xl border border-border-main text-text-primary outline-none"
              value={form.avgPrice}
              onChange={(e) => setForm({ ...form, avgPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="수량"
              className="w-1/2 bg-bg-elevated p-3 rounded-xl border border-border-main text-text-primary outline-none"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-bg-elevated text-text-secondary rounded-xl font-bold"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 bg-accent text-bg-base rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
};
