"use client";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { likeTweet } from "@/lib/actions/tweet.actions";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface Props {
  tweetId: string;
  likes?: string[];
}

const LikeButton = ({ tweetId, likes }: Props) => {
  const path = usePathname();
  const user = useAuth();
  const handleLike = async () => {
    if (typeof user.userId === "string") {
      await likeTweet(tweetId, user.userId, path);
    } else {
      redirect("/sign-in");
    }
  };

  return (
    <Image
      src={
        typeof user.userId === "string" && typeof likes === "object"
          ? likes.includes(user.userId)
            ? "/assets/heart-filled.svg"
            : "/assets/heart-gray.svg"
          : "/assets/heart-gray.svg"
      }
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={() => handleLike()}
    />
  );
};

export default LikeButton;
