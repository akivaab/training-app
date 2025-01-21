import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments, postComment } from "../../api/commentsApi";
import { AuthStateType, CommentType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";

function Comments() {
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    handleGetComments();
  }, []);

  async function handleGetComments() {
    try {
      if (id) {
        setComments(await getComments(axios, id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit() {
    try {
      if (id) {
        await postComment(axios, id, content);
      }
      setIsCommenting(false);
      handleGetComments();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(commentId: number) {
    try {
      if (id) {
        await deleteComment(axios, id, commentId);
      }
      handleGetComments();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="mr-auto max-w-xl">
      <button
        className="mb-2 w-56 rounded bg-sky-400 p-3 text-white shadow transition-all duration-100 hover:bg-sky-700"
        onClick={() => setIsCommenting(!isCommenting)}
      >
        {`Click Here to ${isCommenting ? "Cancel" : "Comment!"}`}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCommenting ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <textarea
          className="m-1 w-full rounded-sm border p-2"
          required
          placeholder="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="mx-1 rounded bg-sky-400 p-2 text-white shadow transition-all duration-100 hover:bg-sky-700"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="my-1 rounded border-2 p-4 shadow transition-shadow hover:shadow-md"
          >
            <h3 className="flex items-start text-sm font-light text-slate-700">
              <span className="mr-[3px] max-w-[70%] truncate">
                User #{comment.userId} says:
              </span>
            </h3>
            <p className="font-verdana whitespace-pre-line break-words text-base font-light text-slate-900">
              {comment.content}
            </p>
            {(auth.userRole === "admin" || auth.userId === comment.userId) && (
              <button
                className="bg-red-300"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <h2 className="my-1 text-lg text-slate-800">
          This post has no comments.
        </h2>
      )}
    </section>
  );
}

export default Comments;
