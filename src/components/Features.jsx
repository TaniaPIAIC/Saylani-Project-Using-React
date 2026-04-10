import React from "react";

const accentClasses = {
  cyan: "bg-cyan-500/10 text-cyan-600",
  emerald: "bg-emerald-500/10 text-emerald-600",
  blue: "bg-blue-500/10 text-blue-600",
  violet: "bg-violet-500/10 text-violet-600",
  amber: "bg-amber-500/10 text-amber-600",
  rose: "bg-rose-500/10 text-rose-600",
};

const Features = ({ features }) => {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Why choose SMIT?</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">A modern learning experience</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Discover the features that make this portal feel polished, professional and ready for real users.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-[32px] border border-slate-200/80 bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${accentClasses[feature.accent]}`}>
                <span className="text-xl font-bold">✓</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
