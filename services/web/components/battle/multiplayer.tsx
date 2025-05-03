'use client'

import React, { useState, useTransition } from 'react'
import { motion } from "framer-motion";
import { Hash, LoaderPinwheel } from "lucide-react";
import { LuSwords } from "react-icons/lu";
import CreateRoom from './CreateRoom';

type Props = {}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Multiplayer({}: Props) {
    const [isPending, startTransition] = useTransition();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className='space-y-4'>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 text-2xl text-theme-sub items-center"
          > <LuSwords className=''/>
            <h1 className="text-theme-sub font-bold mb-4 sm:mb-0">Multiplayer Arena</h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-10 items-center justify-evenly"
          >
            <CreateRoom />
            <CreateRoom />

            {/* <JoinRoom /> */}
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <div className="text-theme-sub">
            <div>
              <div className="flex items-center space-x-3 text-2xl font-bold">
                <Hash className="size-8" />
                <span>Room History</span>
              </div>
            </div>
            <div>
              {isPending ? (
                <LoaderPinwheel className="animate-spin mx-auto size-10 text-yellow-400" />
              ) : (
                
                <div>Room History</div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}