import * as z from 'zod';

export const TweetValidation = z.object({
    tweet: z.string().nonempty().min(3, {message: "Tweet should be at least 3 characters long."}).max(1000, {message: "Maximum 1000 characters."}),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    tweet: z.string().nonempty().min(3, {message: "Tweet should be at least 3 characters long."}).max(1000, {message: "Maximum 1000 characters."}),
})