import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold text-white">SMIT Connect Portal</h3>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Empowering Pakistan's youth with world-class IT education and training programs.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Quick Links</h4>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              {['Home', 'About', 'Courses', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="transition hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Our Courses</h4>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              {['Web Development', 'AI & Machine Learning', 'Cyber Security', 'Data Science'].map((course) => (
                <li key={course}>
                  <a href="#" className="transition hover:text-white">{course}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact Info</h4>
            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <p>A-25, Bahadurabad Chowrangi, Karachi, Pakistan</p>
              <p>+92 21 111 729 526</p>
              <p>saylanimass@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          &copy; 2026 SMIT Connect Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
