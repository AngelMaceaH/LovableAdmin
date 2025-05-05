"use client";

import Image from "next/image";
import { motion } from "framer-motion";
export function Loader() {
  return (
    <div className="relative inline-block w-auto h-auto flex flex-col items-center">
      <motion.div
        className="inline-block"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image
          src="/img/letters.png"
          alt="Lovable"
          width={300}
          height={300}
          priority
        />
      </motion.div>

      <motion.div
        className="absolute -top-10 -right-15"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        <Image
          src="/img/heart.png"
          alt="Corazón Lovable"
          width={125}
          height={125}
          priority
        />
      </motion.div>

      <div className="w-full mt-4 h-3 bg-slate-600 rounded overflow-hidden">
        <motion.div
          className="h-full rounded bg-indigo-500 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.15),rgba(255,255,255,0.15)_10px,transparent_10px,transparent_20px)]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: 0,
          }}
        />
      </div>
    </div>
  );
}