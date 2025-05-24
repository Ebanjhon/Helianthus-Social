export type UserResponse = {
  userId: string;
  username: string;
  firstname: string;
  lastname?: string;
  email: string;
  avatar?: string;
  active: boolean;
  curentUser: boolean;
};

export type createAccount = {
  username: string,
  firstname: string,
  email: string
  password: string,
}

export type createFeed = {
  feedId: string,
  authorId: string,
  content: string,
  createDay: string
}

export type UserSearchResult = {
  userId: string;
  username: string;
  firstname?: string;
  lastname?: string;
  avatar: string | null;
  isFollow: boolean;
};

export type Media = {
  mediaId: string;
  url: string;
  postId: string;
  width: number;
  height: number;
  mediaType: "IMAGE" | "VIDEO" | string;
};

export type FeedData = {
  feedId: string;
  authorId: string;
  content: string;
  createDay: string;
};

export type Author = {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
};

export type Action = {
  isLike: boolean;
  countLike: number;
};

export type TypeFeedItem = {
  feedId: string;
  resource: Media[];
  data: FeedData;
  author: Author;
  action: Action;
};


export type UserProfileInfo = {
  userId: string;
  username: string;
  firstname: string;
  email: string;
  active: boolean;
  dateJoid: string;
  curentUser: boolean;
  lastname?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  gender?: string;
  phoneNumber?: string;
  birthDate?: string;
  countFeed: number;
  countFollow: number;
  countFollowing: number;
};

export type UserUpdate = {
  userId: string;
  firstname: string;
  email: string;
  lastname: string;
  avatar: string;
  cover: string;
  bio: string;
  // gender?: string;
  // phoneNumber?: string;
  // birthDate?: string;
};

// comment

export interface CommentResponse {
  data: Comment;
  user: User;
  hasChil: boolean;
}

export interface Comment {
  commentId: string;
  feedId: string;
  parentCommentId?: string;
  content: string;
  userId: string;
  dateCreate: string;
}

export interface User {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface CreateComment {
  feedId: string | null,
  parentCommentId?: string;
  content: string;
}
// 

export interface CommentResponse {
  commentId: string;
  feedId: string | null;
  parentCommentId?: string;
  content: string;
  userId: string;
  dateCreate: string;
}

// profile
export type MediaItem = {
  mediaId: string;
  url: string;
  authorID: string;
  postId: string;
  width: number;
  height: number;
  mediaType: 'IMAGE' | 'VIDEO';
};
