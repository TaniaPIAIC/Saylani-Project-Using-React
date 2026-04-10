import React from "react";

const Vision = ({ metrics }) => {
  return (
    <section className="py-16 bg-linear-to-r from-gray-900 to-blue-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Our vision</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">SMIT Vision</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {metrics.map((item) => (
            <div key={item.label}>
              <h3 className={`text-4xl font-bold ${item.accent}`}>{item.value}</h3>
              <p className="mt-2 text-lg">{item.label}</p>
              <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[32px] bg-white/10 p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold">Be a Part of This Vision</h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-200">
            Join thousands of students who are already transforming their careers and contributing to Pakistan's digital future.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90">
              Enroll Now
            </button>
            <button className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:opacity-90">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
