'use client';

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Loader from "@/components/core/Loader";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, transition: { duration: 0.3 }, y: 0 },
};

export default function AuthGuard({
  children,
  message = "Sign in to continue",
}: {
  children: React.ReactNode;
  message?: string;
}) {
  const { status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <Loader className="text-theme-text bg-theme-bg" size="2xl" fullScreen />;
  }

  if (status === "unauthenticated") {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center flex-1 p-8 bg-theme-bg"
      >
        <p className="font-bold text-theme-text mb-6">{message}</p>
        <Link
          href={`/auth?callbackUrl=${encodeURIComponent(pathname)}`}
          className="mt-4"
        >
          <button className="px-4 py-2 rounded-md bg-theme-main text-theme-bg hover:bg-theme-text transition-all duration-200 ease-in-out active:scale-95 flex items-center gap-2">
            <span>Sign In</span>
          </button>
        </Link>
      </motion.div>
    );
  }

  return <>{children}</>;
}
