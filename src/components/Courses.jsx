import React from "react";
import { useNavigate } from "react-router-dom";

const Courses = ({ tabs, activeTab, onTabChange, courses }) => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Course catalog</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Browse Our Top Courses</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Explore curated courses designed to launch your tech career with practical learning paths.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article key={course.id} className="overflow-hidden rounded-[32px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_68px_rgba(15,23,42,0.12)]">
              <div className="relative">
                <img src={course.image} alt={course.title} className="h-64 w-full object-cover" />
                <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {course.ribbon}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
                <p className="mt-3 text-slate-600">{course.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                  <span>{course.duration}</span>
                  <button
                    type="button"
                    onClick={() => navigate("/courses")}
                    className="cursor-pointer rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
