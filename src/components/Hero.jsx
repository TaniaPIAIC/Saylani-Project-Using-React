import React from "react";
import { ArrowUpRight, BookOpen, User, Sparkles, PlayCircle } from "lucide-react";
import video from "../assets/video/saylani website video (online-video-cutter.com).mp4";
import { useNavigate } from "react-router-dom";

const Hero = ({ data }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-950 text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_28%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950/95" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              {data.eyebrow}
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {data.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate(data.actions[0].path)}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-[0_24px_64px_rgba(14,165,233,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_72px_rgba(14,165,233,0.30)]"
              >
                <User className="h-5 w-5" />
                {data.actions[0].label}
              </button>

              <button
                onClick={() => navigate(data.actions[1].path)}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition duration-300 hover:bg-white/20"
              >
                <BookOpen className="h-5 w-5" />
                {data.actions[1].label}
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -right-10 bottom-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.2)] backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                      SMIT Experience
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">Learn. Build. Grow.</h2>
                  </div>
                  <PlayCircle className="h-12 w-12 text-white/90" />
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[24px] bg-white p-5 text-slate-900">
                    <p className="text-sm font-semibold text-sky-600">Featured Track</p>
                    <h3 className="mt-2 text-xl font-bold">Modern Web Development</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Build beautiful responsive apps with React, Tailwind and real UI workflows.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-slate-950/80 p-4 text-white">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Next Batch</p>
                      <p className="mt-2 text-xl font-bold">Open</p>
                    </div>
                    <div className="rounded-[24px] bg-slate-950/80 p-4 text-white">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">UI Quality</p>
                      <p className="mt-2 text-xl font-bold">Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;