'use client'

import React, { useState, useTransition } from 'react'
import { motion } from "framer-motion";
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { LuSwords } from "react-icons/lu";
import { RiChatHistoryLine } from "react-icons/ri";
import { RiLoader4Line } from "react-icons/ri";

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
            className="flex flex-col sm:flex-row gap-3 text-2xl text-theme-theme items-center"
          > <LuSwords className='hidden md:block'/>
            <span className="font-bold mb-4 sm:mb-0">Multiplayer Arena</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-10 items-center sm:items-start justify-evenly"
          >
            <CreateRoom />
            <JoinRoom/>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <div className="text-theme-sub">
            <div>
              <div className="flex flex-col sm:flex-row gap-3 text-2xl text-theme-text items-center">
                <RiChatHistoryLine className="hidden md:block" />
                <span className="font-bold mb-4 sm:mb-0">Room History</span>
              </div>
            </div>
            <div>
              {isPending ? (
                <RiLoader4Line className="text-2xl text-theme-text animate-spin" />
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