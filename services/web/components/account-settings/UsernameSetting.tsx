"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { FaRegUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { showToast } from "@/components/core/Toast";
import { getUserByUserName, updateUsername } from "@/actions/user";
import { updateLeaderboardUsername } from "@/actions/leaderboard"

export default function UsernameSetting() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.user?.username) {
      setUsername(session.user.username);
      setNewUsername(session.user.username);

      console.log("session: ", session)
    }
  }, [session]);

  const handleUsernameChange = async () => {
    if (!newUsername.trim() || newUsername === username) {
      handleClose();
      return;
    }

    if (newUsername.length < 3) {
      showToast(
        "error",
        "Error",
        "Username must be at least 3 characters long"
      );
      return;
    }

    if (newUsername.length > 20) {
      showToast("error", "Error", "Username must be less than 20 characters");
      return;
    }

    // Username validation regex (alphanumeric, underscore, hyphen)
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(newUsername)) {
      showToast(
        "error",
        "Error",
        "Username can only contain letters, numbers, underscores, and hyphens"
      );
      return;
    }

    setIsLoading(true);

    try {
    const existingUser = await getUserByUserName(newUsername);

    if (existingUser && existingUser.id !== session?.user?.id) {
      showToast(
        "error",
        "Error",
        "Username already taken. Please choose a different username."
      );
      setIsLoading(false);
      return;
    }

    if (!session?.user?.id) {
        throw new Error("User session not found");
    }
    const result = await updateUsername(session.user.id, newUsername);

    if (!result.success) {
      throw new Error(result.error || "Failed to update username");
    }

    setUsername(newUsername);
    updateLeaderboardUsername(session.user.id, newUsername);
    handleClose();

    showToast(
      "success", 
      "Username Updated!", 
      "Please sign in again to see your new username."
    );

    setTimeout(() => {
      signOut({ 
        callbackUrl: "/auth" 
      });
    }, 2000);
  } catch (error) {
    console.error("Error updating username:", error);
    showToast(
      "error",
      "Error",
      error instanceof Error ? error.message : "Failed to update username"
    );
  } finally {
    setIsLoading(false);
  }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setNewUsername(username);
  }, [username]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-lg border-theme-sub-alt">
        <div className="flex items-center space-x-2 text-theme-sub">
          <FaRegUser className="text-md" />
          <h3 className="text-lg font-medium text-theme-sub">
            Username Settings
          </h3>
        </div>
        <p className="text-theme-text">
          Change your display name for leaderboards and multiplayer
        </p>
        <div className="flex items-center justify-between">
          <div className="text-lg text-theme-main font-extrabold">
            {username || "Not set"}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-theme-main text-sm text-theme-bg font-medium hover:bg-theme-text transition-colors"
          >
            <span>Change Username</span>
          </button>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-theme-bg/80 backdrop-blur-sm"
            onClick={handleOutsideClick}
          >
            <div className="w-[90%] max-w-md rounded-xl bg-theme-sub-alt shadow-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b-2 border-theme-sub/20">
                <h2 className="text-2xl font-medium text-theme-text">
                  Change Username
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-theme-sub/20 transition-colors"
                  aria-label="Close modal"
                >
                  <IoClose className="text-xl text-theme-text" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-theme-text">
                    New Username
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Enter new username"
                    className="w-full px-3 py-2 rounded-lg bg-theme-bg border border-theme-sub text-theme-text placeholder-theme-sub focus:outline-none focus:border-theme-main transition-colors"
                    maxLength={20}
                    autoFocus
                    disabled={isLoading}
                  />
                  <p className="text-xs text-theme-sub">
                    3-20 characters, letters, numbers, underscore, and hyphen
                    only
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 rounded-lg border border-theme-sub text-theme-text hover:bg-theme-sub/20 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUsernameChange}
                    disabled={
                      isLoading ||
                      !newUsername.trim() ||
                      newUsername === username
                    }
                    className={twMerge(
                      "flex-1 px-4 py-2 rounded-lg font-medium transition-colors",
                      "bg-theme-main text-theme-bg hover:bg-theme-text",
                      (isLoading ||
                        !newUsername.trim() ||
                        newUsername === username) &&
                        "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isLoading ? "Updating..." : "Update Username"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
