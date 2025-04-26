// export type FeedItem = {
//   media: media[]; // Danh sách URL ảnh
//   username: string; // Tên người dùng
//   firstname: string; // Tên
//   lastname: string; // Họ
//   timecreate: string; // Thời gian tạo bài đăng (ISO 8601)
//   avatar: string; // URL ảnh đại diện
//   countLike: number; // Số lượt thích
//   countComment: number; // Số bình luận
//   isLike: boolean; // Người dùng hiện tại đã thích bài đăng chưa
//   isFollow: boolean; // Danh sách username mà người dùng hiện tại đang theo dõi
//   isCurrentUser: boolean; // Bài đăng có thuộc về người dùng hiện tại không
//   content: string; // Nội dung bài đăng
// };

type media = {
  id: string;
  url: string;
  width: number;
  height: number;
  typeMedia: 'IMAGE' | 'VIDEO';
};
