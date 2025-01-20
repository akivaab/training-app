import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { deleteItem, getItem } from "../../api/itemsApi";
import { ItemType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";

function Item() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [item, setItem] = useState<ItemType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleGetItem();
  }, []);

  async function handleGetItem() {
    try {
      if (!id) {
        return;
      }
      const data = await getItem(axios, id);
      if (data) {
        setItem(data);
      }
      setIsLoading(false);
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
        <div>
          <div>
            <h2>
              {item.category},{item.size}
            </h2>
            <p>{item.description}</p>
          </div>
          <div className="bg-teal-900">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <Comments />
        </div>
      )}
    </div>
  );
}

export default Item;
