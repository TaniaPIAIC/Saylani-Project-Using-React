import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SocialPosts from "../components/SocialPosts";
import Features from "../components/Features";
import Courses from "../components/Courses";
import Testimonials from "../components/Testimonials";
import Campuses from "../components/Campuses";
import Vision from "../components/Vision";
import Footer from "../components/Footer";

const menuItems = [
  { label: "Home" },
  { label: "About" },
  { label: "Courses" },
  { label: "Campuses" },
  { label: "Check Result" },
];

const heroData = {
  eyebrow: "New Admissions Open",
  title: "Build the future with a premium student portal",
  subtitle:
    "A professional redesign inspired by modern education platforms. Showcase social updates, highlight new courses, and deliver a polished experience.",
  actions: [
    { label: "Student Login / Signup", style: "primary" },
    { label: "Explore Courses", style: "secondary" },
  ],
  stats: [
    { value: "16,000+", label: "Students Trained" },
    { value: "50+", label: "Courses" },
    { value: "95%", label: "Satisfaction" },
    { value: "24/7", label: "Access" },
  ],
};

const statsData = [
  { value: "5000+", label: "Students Enrolled" },
  { value: "50+", label: "Courses Available" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "100+", label: "Leave Requests Managed" },
];

const socialPostsData = [
  {
    id: 1,
    title: "Admissions Open for Skill Accelerator Bootcamp",
    description:
      "Admissions are now open for our Skill Accelerator Bootcamp. Enroll today and begin your practical tech journey with SMIT.",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063900/SMIT/Courses/SAB.jpg",
    tag: "Admissions Open",
  },
  {
    id: 2,
    title: "Agentic AI Enrollment Now Live",
    description:
      "Join students learning LLMs, generative AI and modern intelligent systems through hands-on training and guided instruction.",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764064467/SMIT/Courses/AGI.jpg",
    tag: "Featured Course",
  },
  {
    id: 3,
    title: "Web Development Graduates Moving Forward",
    description:
      "Our learners continue building strong careers through practical training, real projects and updated course content.",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063171/SMIT/Courses/WMA.jpg",
    tag: "Success Story",
  },
];

const featuresData = [
  {
    title: "Hands-On Practical Training",
    description:
      "Students learn through real tasks, guided practice and project-based implementation.",
    accent: "cyan",
  },
  {
    title: "Career-Focused Learning",
    description:
      "Course structure is aligned with employability, freelancing and industry-ready skills.",
    accent: "emerald",
  },
  {
    title: "Professional Learning Environment",
    description:
      "A polished and trusted platform experience inspired by modern education products.",
    accent: "blue",
  },
  {
    title: "Modern Course Categories",
    description:
      "Explore development, AI, networking, design and vocational training in one place.",
    accent: "violet",
  },
  {
    title: "Strong Brand Presentation",
    description:
      "Designed to feel premium, clean and client-facing rather than just student-level work.",
    accent: "amber",
  },
  {
    title: "Responsive Across Devices",
    description:
      "The layout adapts fluidly for desktop, tablet and mobile screens.",
    accent: "rose",
  },
];

const tabs = [
  "Admissions Open",
  "Development",
  "Designing",
  "Networking",
  "Vocational Training Courses",
];

const allCourses = [
  {
    id: 1,
    category: "Admissions Open",
    title: "Digital Marketing With AI",
    description:
      "Introduction to marketing, digital strategies, and AI-powered campaigns.",
    duration: "5 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764064529/SMIT/Courses/DMA.jpg",
    ribbon: "ADMISSION OPEN",
  },
  {
    id: 2,
    category: "Admissions Open",
    title: "Agentic AI",
    description: "Agentic AI, LLMs, Generative AI with real-world applications.",
    duration: "12 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764064467/SMIT/Courses/AGI.jpg",
    ribbon: "ADMISSION OPEN",
  },
  {
    id: 3,
    category: "Admissions Open",
    title: "Skill Accelerator Bootcamp",
    description: "Project-based learning and market-ready skills.",
    duration: "4 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063900/SMIT/Courses/SAB.jpg",
    ribbon: "ADMISSION OPEN",
  },
  {
    id: 4,
    category: "Development",
    title: "Modern Web Application Development",
    description: "React, frontend systems, UI building and real-world projects.",
    duration: "12 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063171/SMIT/Courses/WMA.jpg",
    ribbon: "POPULAR",
  },
  {
    id: 5,
    category: "Development",
    title: "Python Programming",
    description: "Core Python, logic building, scripting and problem solving.",
    duration: "3 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764061428/SMIT/Courses/PY.jpg",
    ribbon: "POPULAR",
  },
  {
    id: 6,
    category: "Designing",
    title: "Graphic Designing With AI",
    description: "Visual design, branding systems and AI-powered creative workflows.",
    duration: "6 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764064487/SMIT/Courses/GDA.jpg",
    ribbon: "NEW",
  },
  {
    id: 7,
    category: "Networking",
    title: "Cyber Security Professional",
    description: "Security fundamentals, defense practices and secure systems.",
    duration: "6 months",
    image:
      "https://res.cloudinary.com/saylani-welfare/image/upload/v1764063950/SMIT/Courses/CSP.jpg",
    ribbon: "NEW",
  },
  {
    id: 8,
    category: "Vocational Training Courses",
    title: "Laptop Repairing",
    description: "Practical vocational training for repair diagnostics and setup.",
    duration: "4 months",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    ribbon: "SKILL TRACK",
  },
  {
    id: 9,
    category: "Vocational Training Courses",
    title: "Solar System Installation",
    description: "Hands-on technical learning for modern installation work.",
    duration: "5 months",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    ribbon: "SKILL TRACK",
  },
];

const testimonialsData = [
  {
    name: "Muhammad Saad",
    review:
      "SMIT transformed my confidence. The practical approach made everything feel real and useful.",
    image: "https://www.saylanimit.com/assets/reviews/muhammad_saad.png",
  },
  {
    name: "Muhammad Fasih",
    review:
      "The course delivery is clear and market-focused. I learned skills that actually matter.",
    image: "https://www.saylanimit.com/assets/reviews/muhammad_fasih.png",
  },
  {
    name: "Kamran",
    review:
      "A very professional and inspiring learning experience. It feels modern, serious and valuable.",
    image: "https://www.saylanimit.com/assets/reviews/kamran.png",
  },
];

const campusLocations = [
  "Karachi",
  "Faisalabad",
  "Hyderabad",
  "Peshawar",
  "Quetta",
  "Islamabad",
  "Rawalpindi",
  "Gujranwala",
  "Sukkur",
  "Lakki Marwat",
];

const visionMetrics = [
  {
    value: "10 Million+",
    label: "IT Experts Trained",
    accent: "text-cyan-400",
    description:
      "Training the next generation of skilled IT professionals to compete globally.",
  },
  {
    value: "$100 Billion",
    label: "Digital Economy",
    accent: "text-emerald-400",
    description:
      "Contributing to Pakistan's economic growth through technology and innovation.",
  },
  {
    value: "150+",
    label: "Startups Launched",
    accent: "text-amber-400",
    description:
      "Globally recognized startups founded by our alumni.",
  },
];

const Home = () => {
  const [activeCourseTab, setActiveCourseTab] = useState(tabs[0]);

  const activeCourses = useMemo(
    () => allCourses.filter((course) => course.category === activeCourseTab),
    [activeCourseTab]
  );

  return (
    <>
      <Navbar menuItems={menuItems} />
      <Hero data={heroData} />
      <Stats stats={statsData} />
      <SocialPosts posts={socialPostsData} />
      <Features features={featuresData} />
      <Courses
        tabs={tabs}
        activeTab={activeCourseTab}
        onTabChange={setActiveCourseTab}
        courses={activeCourses}
      />
      <Testimonials testimonials={testimonialsData} />
      <Campuses campuses={campusLocations} />
      <Vision metrics={visionMetrics} />
      <Footer />
    </>
  );
};

export default Home;
