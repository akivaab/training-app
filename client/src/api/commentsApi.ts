export type CommentType = {
  id: number;
  content: string;
  itemId: number;
  userId: number;
};

export async function getItemComments(itemId: string): Promise<CommentType[]> {
  console.log("get comments of item " + itemId);
  return commentDb.filter((c) => c.itemId.toString() === itemId);
}

export async function postItemComment(content: string, itemId: string) {
  console.log("post comment " + content + " on item " + itemId);
  commentDb.push({
    id: globalId++,
    content,
    itemId: parseInt(itemId),
    userId: 2
  });
}

export async function deleteItemComment(commentId: number) {
  console.log("delete comment " + commentId);
  commentDb = commentDb.filter((c) => c.id !== commentId);
}
