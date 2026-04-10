import { ArrowUpRight } from "lucide-react";


const Button = () => {
  return (
    <>
      <button className="flex items-center gap-3 rounded-full bg-linear-to-r from-sky-600 via-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl">
        <span>Enroll Now</span>
        <ArrowUpRight className="arrow-loop" size={20} strokeWidth={1.75} />
      </button>
    </>
  );
};

export default Button;
