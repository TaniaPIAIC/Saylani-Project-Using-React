import React from "react";


    
     import { useState } from "react";

const posts = [
  {
    id: 1,
    author: "Saylani Mass IT Training",
    handle: "SMIT Official",
    time: "2 hours ago",
    verified: true,
    avatar: "https://www.saylanimit.com/assets/transparent_logo.png",
    image: "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063900/SMIT/Courses/SAB.jpg",
    content:
      "🚀 Admissions are NOW OPEN for our Skill Accelerator Bootcamp! Enroll today and kickstart your tech career with hands-on training from Pakistan's best instructors. Seats are limited — don't miss out! ✅\n\n#SMIT #SaylaniMassIT #SkillAccelerator #TechPakistan",
    likes: 1423,
    comments: 218,
    shares: 394,
    tag: "Admissions Open",
  },
  {
    id: 2,
    author: "Saylani Mass IT Training",
    handle: "SMIT Official",
    time: "1 day ago",
    verified: true,
    avatar: "https://www.saylanimit.com/assets/transparent_logo.png",
    image: "https://res.cloudinary.com/saylani-welfare/image/upload/v1764064467/SMIT/Courses/AGI.jpg",
    content:
      "🤖 Our Agentic AI course is breaking records in enrollment! Join thousands of students mastering LLMs, Generative AI & the future of intelligent systems. 12-month comprehensive program with industry mentors.\n\n📌 Register now at saylanimit.com\n\n#AgenticAI #GenerativeAI #AITraining #Pakistan",
    likes: 3891,
    comments: 512,
    shares: 870,
    tag: "Featured Course",
  },
  {
    id: 3,
    author: "Saylani Mass IT Training",
    handle: "SMIT Official",
    time: "3 days ago",
    verified: true,
    avatar: "https://www.saylanimit.com/assets/transparent_logo.png",
    image: "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063171/SMIT/Courses/WMA.jpg",
    content:
      "🎓 Congratulations to our latest batch of Modern Web Application Development graduates! 💻 From zero to full-stack heroes — we are proud of every single one of you. Pakistan's tech future is bright! 🇵🇰\n\n#Graduation #WebDev #SMIT #ProudMoment",
    likes: 6204,
    comments: 934,
    shares: 1243,
    tag: "Achievement",
  },
];

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

function ThumbsUp({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? "#16a34a" : "none"} stroke={filled ? "#16a34a" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#1877F2">
      <path d="M9 12l2 2 4-4M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.764 3.04 3.745 3.745 0 01-3.04.764A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.04-.764 3.746 3.746 0 01-.764-3.04A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 01.764-3.04 3.746 3.746 0 013.04-.764A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.04.764 3.745 3.745 0 01.764 3.04A3.745 3.745 0 0121 12z"/>
    </svg>
  );
}

function FbLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [expanded, setExpanded] = useState(false);

  const lines = post.content.split("\n");
  const preview = lines.slice(0, 2).join("\n");
  const hasMore = lines.length > 2;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const tagColors = {
    "Admissions Open": "bg-emerald-100 text-emerald-800",
    "Featured Course": "bg-blue-100 text-blue-800",
    "Achievement": "bg-amber-100 text-amber-800",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-green-50 border-2 border-green-200 overflow-hidden flex items-center justify-center">
            <img src={post.avatar} alt="SMIT" className="w-9 h-9 object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900 text-sm">{post.author}</span>
              <VerifiedBadge />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{post.time}</span>
              <span className="text-gray-300 text-xs">·</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}>
          {post.tag}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {expanded ? post.content : preview}
          {hasMore && !expanded && (
            <button onClick={() => setExpanded(true)} className="text-green-700 font-medium ml-1 hover:underline text-sm">
              ...See more
            </button>
          )}
        </p>
      </div>

      {/* Image */}
      <div className="relative">
        <img src={post.image} alt="Post" className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Reaction counts */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            
          </div>
          <span className="text-xs text-gray-500">{formatCount(likeCount)}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{formatCount(post.comments)} comments</span>
          <span>{formatCount(post.shares)} shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around px-2 py-1">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
            liked ? "text-green-700 bg-green-50" : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <ThumbsUp filled={liked} />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors flex-1 justify-center">
          <CommentIcon />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors flex-1 justify-center">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default function SMITFacebookSection() {
  return (
    <div className="max-w-6xl mx-auto">

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <FbLogo />
          <span>Follow us on Facebook</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Latest from Our <span className="text-green-700">Community</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          Stay connected with SMIT's updates, achievements, and announcements straight from our official Facebook page.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <a
          href="https://www.facebook.com/saylanimit"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-7 py-3 rounded-xl transition-colors duration-200 text-sm"
        >
          <FbLogo />
          <span style={{ filter: "brightness(10)" }}>View All Posts on Facebook</span>
        </a>
      </div>
    </div>
  );
}
    
 

 
