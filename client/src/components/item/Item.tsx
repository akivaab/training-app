import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { deleteItem, getItem, patchItemBorrower } from "../../api/itemsApi";
import { AuthStateType, ItemType, UserType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import useAuth from "../../hooks/useAuth";
import Alert from "../layout/Alert";

function Item() {
  const navigate = useNavigate();
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [item, setItem] = useState<(ItemType & UserType) | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    handleGetItem();
  }, []);

  async function handleGetItem() {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
        return;
      }
      const itemData = await getItem(axios, id);
      if (itemData) {
        setItem(itemData);
      }
      setIsLoading(false);
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleBorrow(isBorrowed: boolean) {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
        return;
      }
      await patchItemBorrower(axios, id, isBorrowed);
      handleGetItem();
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  function handleEdit() {
    const data = {
      category: item?.category,
      size: item?.size,
      description: item?.description
    };
    navigate("edit", { state: data });
  }

  async function handleDelete() {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid user ID.`);
        return;
      }
      await deleteItem(axios, id);
      navigate("/items", { replace: true });
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <div>
      {errorMsg && <Alert message={errorMsg} />}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !item && <div>Error</div>}
      {!isLoading && item && (
        <>
          <div className="relative mx-auto mt-8 flex max-w-xl flex-col rounded-lg bg-sky-100 p-6 shadow-md">
            {/* Item Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-sky-600">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </h2>
              <h3 className="mt-2 text-lg text-gray-800">Size {item.size}</h3>
              <p className="mt-4 text-base text-slate-700">
                {item.description}
              </p>
              <h3 className="mt-4 text-sm text-gray-600">
                Contact lender {item.firstName} {item.lastName} at {item.email}{" "}
                or {item.phone}
              </h3>
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
                // Return
                <button
                  className="mx-2 mb-4 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-gray-500"
                  onClick={() => handleBorrow(false)}
                  disabled={item.borrowerId === null}
                >
                  {item.borrowerId
                    ? `Returned from User #${item.borrowerId}`
                    : "Available to Borrow"}
                </button>
              ) : (
                // Borrow
                <button
                  className="mx-2 mb-4 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-gray-500"
                  onClick={() => handleBorrow(true)}
                  disabled={item.borrowerId !== null}
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
                {/* Edit */}
                {auth.userRole === "admin" && (
                  <button
                    className="mx-2 w-2/5 rounded-lg bg-sky-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-sky-400"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
                {/* Delete */}
                {(auth.userRole === "admin" ||
                  auth.userId === item.lenderId) && (
                  <button
                    className="mx-2 w-2/5 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors duration-100 hover:bg-red-700"
                    onClick={handleDelete}
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
