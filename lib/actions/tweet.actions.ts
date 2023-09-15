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