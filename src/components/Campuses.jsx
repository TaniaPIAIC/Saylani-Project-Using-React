import React from "react";
import { MapPin } from "lucide-react";

const Campuses = ({ campuses }) => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Campus locations</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Find SMIT Campuses Near You</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Our campuses are located across Pakistan. Select your city to find the nearest location.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <img src="https://www.saylanimit.com/assets/pk_map.svg" alt="Pakistan map" className="w-full max-w-2xl" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {campuses.map((city) => (
            <div
              key={city}
              className="rounded-[28px] border border-slate-200 bg-white px-5 py-6 text-center transition hover:border-slate-300 hover:shadow-lg"
            >
              <MapPin className="mx-auto mb-4 h-8 w-8 text-sky-600" />
              <p className="font-semibold text-slate-900">{city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campuses;
