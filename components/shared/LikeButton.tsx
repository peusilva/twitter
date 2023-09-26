"use client";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import { likeTweet, unlikeTweet } from "@/lib/actions/tweet.actions";

import { useAuth } from "@clerk/nextjs";

interface Props {
  tweetId: string;
  likes?: string[];
}

const LikeButton = ({ tweetId, likes }: Props) => {
  const path = usePathname();
  const user = useAuth();

  const isLiked =
    typeof likes === "object" &&
    typeof user.userId === "string" &&
    likes.includes(user.userId);
  const handleLike = async () => {
    if (typeof user.userId === "string") {
      if (!isLiked) {
        await likeTweet(tweetId, user.userId, path);
      } else if (isLiked) {
        await unlikeTweet(tweetId, user.userId, path);
      }
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
