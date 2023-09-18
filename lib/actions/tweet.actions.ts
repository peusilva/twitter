"use server"

import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string,
}

export async function createTweet({text, author, communityId, path}: Params) {
    connectToDB();

    const createdTweet = await Tweet.create({
        text,
        author,
        community: null,
    });

    //Update user model
    await User.findByIdAndUpdate(author, {
        $push: {tweets: createdTweet._id }
    })

    revalidatePath(path);
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //Calculate number of posts to skip
    const skipAmount = (pageNumber -1 ) * pageSize;

    // Fetch the posts that ahave no parents (top-level tweets...)
    const postsQuery = Tweet.find({ parentId: { $in: [null, undefined]}})
        .sort ({ createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User})
        .populate ({
             path: 'children',
             populate: {
                path: 'author',
                model: User,
                select: '_id name parentId image'
             }
            })

            const totalPostsCount = await Tweet.countDocuments({ parentId: { $in: [null, undefined]}})

            const posts = await postsQuery.exec();

            const isNext = totalPostsCount > skipAmount + posts.length;

            return { posts, isNext }
}