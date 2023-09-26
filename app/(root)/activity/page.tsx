import {
  fetchActivities,
  fetchLikeActivities,
  fetchUser,
  fetchUsers,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // fetchActivities
  const activity = await fetchActivities(userInfo._id);
  const likedUsers = await fetchLikeActivities(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        <h2 className="text-light-1">Recent Replies</h2>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/tweet/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your tweet
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">
            No recent replies...
          </p>
        )}
      </section>
      <section className="mt-10 flex flex-col gap-5">
        <h2 className="text-light-1">Recent Likes</h2>
        {likedUsers.length > 0 ? (
          <>
            {likedUsers.map((likedUser) => (
              <Link key={likedUser.id} href={`/profile/${likedUser.id}`}>
                <article className="activity-card">
                  <Image
                    src={likedUser.image}
                    alt="Profile picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {likedUser.name}
                    </span>{" "}
                    liked one of your tweets
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No recent likes...</p>
        )}
      </section>
    </section>
  );
}

export default Page;
