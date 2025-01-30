import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem, getItem, patchItemBorrower } from "../../api/itemsApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import Comments from "./Comments";
import Alert from "../layout/Alert";
import capitalize from "../../util/capitalize";
import { AuthStateType, ItemType, UserType } from "../../types/types";

function Item() {
  const navigate = useNavigate();
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [item, setItem] = useState<
    | (ItemType & Pick<UserType, "firstName" | "lastName" | "email" | "phone">)
    | null
  >(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    handleGetItem();
  }, []);

  async function handleGetItem(): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else {
        setItem(await getItem(axios, id));
        setErrorMsg("");
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleBorrow(isBorrowed: boolean): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else {
        await patchItemBorrower(axios, id, isBorrowed);
        setErrorMsg("");
        handleGetItem();
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else {
        await deleteItem(axios, id);
        setErrorMsg("");
        navigate("/menu", { replace: true });
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <div>
      {errorMsg && <Alert message={errorMsg} />}
      {item && (
        <>
          <div className="relative mx-auto mt-8 flex max-w-xl flex-col rounded-lg bg-sky-100 p-6 shadow-md">
            {/* Item Info */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-sky-700">
                {capitalize(item.category)}
              </h2>
              <h3 className="mt-1 text-xl font-semibold text-sky-950">
                Size {item.size}
              </h3>
              <p className="mt-2 whitespace-pre-line break-words text-lg text-slate-900">
                {item.description}
              </p>
              {auth.userId !== item.lenderId && (
                <div className="mt-4 text-sm font-semibold">
                  <p className="text-slate-600">
                    To borrow, press the button below and contact lender:
                  </p>

                  <div className="w-1/3 break-words rounded-xl bg-sky-200 p-1 text-gray-800">
                    <p>
                      {item.lastName}, {item.firstName}
                    </p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                  </div>
                </div>
              )}
              {item.borrowerId && (
                <p className="mt-2 text-sm text-red-600">
                  {auth.userId === item.borrowerId
                    ? "You have borrowed this item."
                    : "This item is currently lent out."}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-auto flex flex-col items-center">
              {/* Borrow/Return */}
              {auth.userId === item.lenderId ? (
                // Return (if user is lender)
                <button
                  onClick={() => handleBorrow(false)}
                  disabled={item.borrowerId === null}
                  className="mx-2 mb-4 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  {item.borrowerId
                    ? `Returned from Borrower`
                    : "Item in Possession"}
                </button>
              ) : (
                // Borrow (if user is not lender)
                <button
                  onClick={() => handleBorrow(true)}
                  disabled={item.borrowerId !== null}
                  className="mx-2 mb-4 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  Borrow
                </button>
              )}

              {/* Edit/Delete */}
              <div
                className={`flex w-full ${
                  auth.userRole === "admin"
                    ? "justify-between"
                    : "justify-center"
                }`}
              >
                {/* Edit (if user is admin) */}
                {auth.userRole === "admin" && (
                  <button
                    onClick={() => navigate("edit")}
                    className="mx-2 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400"
                  >
                    Edit
                  </button>
                )}
                {/* Delete (if user is admin or lender) */}
                {(auth.userRole === "admin" ||
                  auth.userId === item.lenderId) && (
                  <button
                    onClick={handleDelete}
                    className="mx-2 w-2/5 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          <Comments />
        </>
      )}
    </div>
  );
}

export default Item;
