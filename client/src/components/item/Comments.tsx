import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments, postComment } from "../../api/commentsApi";
import { AuthStateType, CommentType, UserType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import Alert from "../layout/Alert";

function Comments() {
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [comments, setComments] = useState<
    (CommentType & Pick<UserType, "firstName" | "lastName">)[]
  >([]);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    handleGetComments();
  }, []);

  async function handleGetComments(): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else {
        setComments(await getComments(axios, id));
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleSubmit(): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
      } else {
        await postComment(axios, id, content);
      }
      setIsCommenting(false);
      handleGetComments();
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleDelete(commentId: number): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
      } else {
        await deleteComment(axios, id, commentId);
      }
      handleGetComments();
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <section className="mx-auto mt-8 max-w-xl p-4">
        {/* Write Comment */}
        <button
          className="mb-4 w-5/12 rounded-lg bg-sky-400 px-5 py-3 text-white shadow transition-colors duration-100 hover:bg-sky-700"
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
            className="mb-px w-full rounded-md border p-3"
            required
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="mb-4 w-1/4 rounded-lg bg-sky-400 px-5 py-3 text-white shadow transition-colors duration-100 hover:bg-sky-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {/* Comments */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 rounded-md border border-gray-300 bg-white p-4 shadow-sm"
            >
              <h3 className="mb-2 text-sm font-medium text-slate-600">
                {comment.firstName} {comment.lastName} says:
              </h3>
              <p className="text-base text-slate-800">{comment.content}</p>
              {(auth.userRole === "admin" ||
                auth.userId === comment.userId) && (
                <button
                  className="mt-2 rounded-md bg-red-500 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <h2 className="text-lg text-slate-800">This post has no comments.</h2>
        )}
      </section>
    </>
  );
}

export default Comments;
