import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import TweetCard from "../cards/TweetCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const TweetsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.tweets.map((tweet: any) => (
        <TweetCard
          key={tweet._id}
          id={tweet._id}
          currentUserId={currentUserId}
          parentId={tweet.parentId}
          content={tweet.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: tweet.author.name,
                  image: tweet.author.image,
                  id: tweet.author.id,
                }
          } // todo
          community={tweet.community} // todo
          createdAt={tweet.createdAt}
          comments={tweet.children}
        />
      ))}
    </section>
  );
};

export default TweetsTab;
