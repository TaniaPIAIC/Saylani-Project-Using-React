import React from "react";

const SocialPosts = ({ posts }) => {
  return (
    <section className="py-16 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Community feed</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Latest from SMIT Facebook</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            See the portal updates and course announcements directly from SMIT's official community feed.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_32px_72px_rgba(15,23,42,0.12)]">
              <img src={post.image} alt={post.title} className="h-64 w-full object-cover" />
              <div className="p-6">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {post.tag}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-3 text-slate-600">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialPosts;
