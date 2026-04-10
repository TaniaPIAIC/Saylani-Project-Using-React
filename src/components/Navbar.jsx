import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../assets/images/Saylani Logo.png"

const Navbar = ({ menuItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <img className="w-25"  src={logo} alt="Saylani Logo" />

        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="text-sm font-medium text-slate-700 transition hover:text-sky-600"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-xl">
            Apply Now
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className={`fixed inset-0 z-50 bg-white/95 p-6 transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">SMIT Connect</p>
            <p className="text-xs text-slate-500">Student portal</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close navigation menu">
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="block w-full rounded-3xl border border-slate-200 px-4 py-4 text-left text-lg font-semibold text-slate-800 transition hover:bg-slate-100"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
