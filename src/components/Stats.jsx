import React from "react";

const Stats = ({ stats }) => {
  return (
    <section className="bg-linear-to-r from-blue-900 to-cyan-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.14)]">
              <p className="text-4xl font-black">{item.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-200">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
