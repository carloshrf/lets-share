export default interface ISaveCommentDTO {
  id?: string;
  text: string;
  post_id: string;
  user_id: string;
  comment_reply_id: string;
}
