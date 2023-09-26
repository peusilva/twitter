import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes?: string[];
}

const TweetCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7 hover:bg-dark-3"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-1"} mt-3 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <div className="gap-0 flex">
                  <LikeButton
                    tweetId={JSON.parse(JSON.stringify(id))}
                    likes={likes}
                  />
                  {likes !== undefined && likes.length > 0 && (
                    <span className="text-subtle-medium text-gray-1 flex items-center">
                      {likes.length}
                    </span>
                  )}
                </div>
                <div className="gap-0 flex">
                  <Link href={`/tweet/${id}`}>
                    <Image
                      src="/assets/reply.svg"
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  {comments !== undefined && comments.length > 0 && (
                    <span className="text-subtle-medium text-gray-1 flex items-center">
                      {comments.length}
                    </span>
                  )}
                </div>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/tweet/${id}`}>
                  <p className="mt-1 text-subtle-mmedium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* TODO: Delete tweet */}
        {/* TODO: Show comment logos */}
      </div>
      <div className="text-subtle-medium text-gray-1 mt-2">
        <p>{formatDateString(createdAt)}</p>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-2 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            height={14}
            width={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default TweetCard;
