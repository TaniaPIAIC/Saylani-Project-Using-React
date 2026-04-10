import React from "react";
import { Star } from "lucide-react";

const Testimonials = ({ testimonials }) => {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Student stories</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">What Our Students Say About Us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Hear from students who transformed their careers with SMIT Connect.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[32px] border border-slate-200/80 bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <div className="mt-2 flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-slate-600">"{item.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
