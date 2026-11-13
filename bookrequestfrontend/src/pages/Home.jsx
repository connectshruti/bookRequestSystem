
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  LibraryBig,
  ShieldCheck,
  Sparkles,
  Users,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: LibraryBig,
    title: "Explore Resources",
    description: "Discover books across different technologies and domains.",
  },
  {
    icon: Search,
    title: "Find What You Need",
    description: "Browse the available collection and find your next read.",
  },
  {
    icon: Users,
    title: "Built for Teams",
    description: "A shared knowledge space for your entire organization.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#161316] text-white">

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-glow absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-[#ff6d29]/20 blur-[150px]" />
        <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-[#453027]/60 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#ff6d29]/10 blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-12">

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6d29] text-[#161316]">
            <BookOpen size={23} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold tracking-tight">
              Book<span className="text-[#ff6d29]">Hub.</span>
            </h2>
            <p className="text-[9px] tracking-[3px] text-[#bababa]">
              RESOURCE CENTER
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-[#bababa] md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#access" className="transition hover:text-white">
            Get Started
          </a>
        </div>

        <a
          href="#access"
          className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition hover:border-[#ff6d29] hover:text-[#ff9b63]"
        >
          Explore <ArrowUpRight size={16} />
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-12 lg:pb-32 lg:pt-24">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ff6d29]/30 bg-[#ff6d29]/10 px-4 py-2 text-xs text-[#ff9b63]">
            <Sparkles size={14} />
            YOUR ORGANIZATION'S KNOWLEDGE HUB
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.12] tracking-[-3px] sm:text-6xl lg:text-7xl">
            Knowledge
            <br />
            begins with
            <br />
            <span className="bg-gradient-to-r from-[#ff6d29] to-[#ffb18a] bg-clip-text text-transparent">
              a book.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-[#bababa] sm:text-lg">
            Your organization's library, reimagined. Discover technical
            resources, explore new technologies and request the books
            that help you grow.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#access"
              className="group flex items-center gap-3 rounded-xl bg-[#ff6d29] px-7 py-4 font-semibold text-[#161316] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,109,41,0.3)]"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href="#features"
              className="rounded-xl border border-white/15 px-7 py-4 text-sm text-white transition hover:border-[#ff6d29] hover:bg-white/5"
            >
              Discover More
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-[#bababa]">
            <div className="flex -space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#161316] bg-[#453027]">
                <Users size={15} />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#161316] bg-[#ff6d29] text-[#161316]">
                <BookOpen size={15} />
              </div>
            </div>
            A smarter way to share knowledge
          </div>
        </motion.div>

        {/* Visual book illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto flex h-[420px] w-full max-w-[500px] items-center justify-center"
        >
          <div className="absolute h-[330px] w-[330px] rounded-full border border-[#ff6d29]/20" />
          <div className="absolute h-[410px] w-[410px] rounded-full border border-white/5" />

          <div className="glow relative flex h-[310px] w-[260px] items-center justify-center rounded-[35px] border border-white/15 bg-gradient-to-br from-[#63402f] via-[#302019] to-[#161316]">
            <div className="absolute inset-3 rounded-[28px] border border-white/10" />

            <div className="text-center">
              <BookOpen
                size={100}
                strokeWidth={1}
                className="mx-auto text-[#ff8a55]"
              />
              <p className="mt-7 text-xs tracking-[5px] text-[#bababa]">
                KNOWLEDGE
              </p>
              <h2 className="mt-2 text-3xl font-bold">Unlimited.</h2>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-9 top-12 rounded-2xl border border-white/15 bg-[#453027] p-4 shadow-xl"
            >
              <ShieldCheck size={28} className="text-[#ff8a55]" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-5 -left-8 rounded-2xl border border-white/15 bg-[#28201d] p-4 shadow-xl"
            >
              <LibraryBig size={27} className="text-[#ff8a55]" />
            </motion.div>
          </div>

          <div className="absolute right-2 top-12 rounded-full border border-white/10 bg-[#453027]/80 px-4 py-2 text-xs text-[#ffb18a] backdrop-blur-xl">
            Read. Learn. Grow.
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 border-t border-white/10 bg-white/[0.02] px-6 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[4px] text-[#ff6d29]">
              WHY BOOKHUB
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Everything you need to
              <span className="text-[#ff8a55]"> keep growing.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -7 }}
                  className="glass rounded-2xl p-7 transition-colors hover:border-[#ff6d29]/40"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6d29]/15 text-[#ff8a55]">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#bababa]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role selection */}
      <section
        id="access"
        className="relative z-10 px-6 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-[4px] text-[#ff6d29]">
              YOUR JOURNEY STARTS HERE
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Choose your workspace.
            </h2>

            <p className="mt-4 text-sm text-[#bababa]">
              Select your role to access BookHub.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <RoleCard
              icon={ShieldCheck}
              title="Administrator"
              description="Manage books, monitor requests and organize your organization's library."
              label="ADMIN ACCESS"
              link="/admin/login"
            />

            <RoleCard
              icon={Users}
              title="Employee"
              description="Explore available books, discover technologies and submit book requests."
              label="EMPLOYEE ACCESS"
              link="/employee/dashboard"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-[#bababa]">
          <p>
            © {new Date().getFullYear()} BookHub. All rights reserved.
          </p>
          <p>Built for knowledge. Designed for growth.</p>
        </div>
      </footer>
    </main>
  );
}

function RoleCard({ icon: Icon, title, description, label, link }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass group rounded-3xl p-8 transition-all hover:border-[#ff6d29]/50 hover:shadow-[0_15px_60px_rgba(255,109,41,0.08)]"
    >
      <div className="mb-7 flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6d29]/15 text-[#ff8a55]">
          <Icon size={27} />
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-widest text-[#bababa]">
          {label}
        </span>
      </div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p className="mt-3 min-h-[60px] text-sm leading-7 text-[#bababa]">
        {description}
      </p>

      <Link
        to={link}
        className="mt-7 flex items-center gap-2 font-semibold text-[#ff8a55] transition group-hover:gap-4"
      >
        Continue <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
}
