/**
 * Seed the database with resume data.
 * Run: npm run seed
 */
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Profile = require("../models/Profile");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

const profile = {
  name: "Pradyumn Singh",
  title: "Full-Stack Developer & Founder of ArenaZ4",
  bio: "B.Tech CSE student at GLA University and founder of ArenaZ4, a bootstrapped esports tournament platform. I build full-stack products with Next.js, NestJS and PostgreSQL, and actively compete in CTFs and competitive programming.",
  email: "pradyumnsingh6124@gmail.com",
  phone: "+91-8899989702",
  location: "Mathura, Uttar Pradesh, India",
  socials: {
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/0pradyumn",
    leetcode: "https://leetcode.com/u/0pradyumn",
    codeforces: "https://codeforces.com/profile/0pradyumn",
  },
  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      institution: "GLA University, Mathura",
      period: "2024 - 2028 (Expected May 2028)",
      score: "CGPA: 7.25",
    },
    {
      degree: "Class XII (CBSE, PCMB)",
      institution: "Chandanvan Public School, Mathura",
      period: "2023",
      score: "82.4%",
    },
    {
      degree: "Class X (ICSE)",
      institution: "Sacred Heart Convent Higher Secondary School, Mathura",
      period: "2021",
      score: "87.6%",
    },
  ],
  achievements: [
    "Founder of Arena-Z4 (Bootstrapped Startup)",
    "Organized and managed a team of 150+ volunteers during Anti-Ragging Week (2025)",
    "Active GitHub collaborator and full-stack project developer",
    "Competitive Programming on LeetCode and Codeforces",
    "Active participant in cybersecurity CTF competitions",
  ],
};

const projects = [
  {
    title: "ArenaZ4 - Full-Stack Esports Tournament Platform",
    techStack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Razorpay", "Tailwind CSS", "TypeScript"],
    role: "Founder & Developer",
    period: "Ongoing",
    featured: true,
    order: 1,
    description: [
      "Full-stack esports tournament platform: discover tournaments, register, track rankings, manage competitive profiles from one dashboard.",
      "Next.js frontend + NestJS backend with Prisma ORM and PostgreSQL, Razorpay integrated for wallet and payment flows.",
      "Role-aware architecture: protected dashboard routes, admin panel, leaderboard, wallet, transactions, matches and player profile modules.",
    ],
  },
  {
    title: "Real-Time File Integrity Monitoring (FIM) Tool",
    techStack: ["Java", "Java NIO", "Swing", "SHA-256", "SMTP"],
    role: "Developer",
    period: "Jan 2025 - Apr 2025",
    featured: true,
    order: 2,
    description: [
      "Enterprise-grade FIM using Java NIO WatchService for real-time file system monitoring with sub-50ms detection latency.",
      "SHA-256 hashing for integrity verification, intelligent rename detection with debouncing to eliminate false positives.",
      "Swing GUI dashboard with live event streams, severity indicators and SMTP email alerts (Publisher-Subscriber pattern).",
    ],
  },
];

const skills = [
  { category: "Programming Languages", items: ["Java", "Python", "C++", "JavaScript", "TypeScript"], order: 1 },
  { category: "Backend", items: ["Node.js", "Express.js", "NestJS"], order: 2 },
  { category: "Frontend", items: ["Next.js", "Tailwind CSS", "HTML"], order: 3 },
  { category: "Database & ORM", items: ["PostgreSQL", "Prisma", "MongoDB"], order: 4 },
  { category: "Payments", items: ["Razorpay"], order: 5 },
  { category: "Cybersecurity", items: ["Kali Linux", "Burp Suite", "Wireshark", "Nmap"], order: 6 },
  { category: "Core CS", items: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "DBMS", "Computer Organisation"], order: 7 },
];

async function seed() {
  await connectDB();
  await Promise.all([Profile.deleteMany({}), Project.deleteMany({}), Skill.deleteMany({})]);
  await Profile.create(profile);
  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  console.log("Database seeded with resume data.");
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
