import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { deleteItem, getItem, patchItemBorrower } from "../../api/itemsApi";
import { AuthStateType, ItemType, UserType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { getUser } from "../../api/usersApi";
import useAuth from "../../hooks/useAuth";

function Item() {
  const navigate = useNavigate();
  const auth = useAuth()?.auth as AuthStateType;
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [lender, setLender] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetItem();
  }, []);

  async function handleGetItem() {
    try {
      if (!id) {
        return;
      }
      const itemData = await getItem(axios, id);
      if (itemData) {
        setItem(itemData);
      }
      const userData = await getUser(axios, itemData.lenderId.toString());
      if (userData) {
        setLender(userData);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleBorrow() {
    try {
      if (!id) {
        return;
      }
      await patchItemBorrower(axios, id);
      handleGetItem();
    } catch (err) {
      console.error(err);
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
      if (!id) {
        return;
      }
      await deleteItem(axios, id);
      navigate("/items", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !item && <div>Error</div>}
      {!isLoading && item && (
        <>
          <div className="mx-auto mt-8 max-w-xl rounded-lg bg-sky-200 p-4">
            <div>
              <h2 className="text-2xl">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </h2>
              <h3 className="text-lg">Size {item.size}</h3>
              <p>{item.description}</p>
              <h3>Contact Lender at {lender?.phone}</h3>
            </div>

            {item.borrowerId && <p>This item is currently lent out.</p>}
            <button
              className="rounded-lg bg-teal-900 p-3 text-white transition-colors duration-100 hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-500"
              onClick={handleBorrow}
              disabled={item.borrowerId !== null}
            >
              Borrow {item.borrowerId}
            </button>

            <section>
              {auth.userRole === "admin" && (
                <button
                  className="rounded-lg bg-teal-900 p-3 text-white transition-colors duration-100 hover:bg-teal-700"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              {(auth.userRole === "admin" || auth.userId === item.lenderId) && (
                <button
                  className="rounded-lg bg-teal-900 p-3 text-white transition-colors duration-100 hover:bg-teal-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </section>
          </div>

          <Comments />
        </>
      )}
    </div>
  );
}

export default Item;
