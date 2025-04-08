export type FeedItemDetail = {
    userId: string,
    feedId: string,
    username: string,
    avatar?: string,
    resourceList?: string[],
    countLike: number;
    countComment: number;
    time: string
    content: string,
};