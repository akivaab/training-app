import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getItems } from "../../api/itemsApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import categoryList from "../../util/categoryList";
import capitalize from "../../util/capitalize";
import { CategoryType, ItemErrorPropType, ItemType } from "../../types/types";

function ItemList({ onError }: ItemErrorPropType) {
  const axios = useAxiosInstance();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<
    Pick<ItemType, "id" | "category" | "size" | "description">[]
  >([]);

  useEffect(() => {
    const category = (searchParams.get("category") as CategoryType) || null;
    const min = parseInt(searchParams.get("min") || "1");
    const max = parseInt(searchParams.get("max") || "1");
    handleGetItems(category, min, max);
  }, [searchParams]);

  async function handleGetItems(
    category: CategoryType,
    min: number,
    max: number
  ): Promise<void> {
    try {
      if (!categoryList.includes(category as CategoryType)) {
        setItems([]);
      } else {
        const allItems = await getItems(axios);
        const selectedItems = allItems.filter(
          (i) => i.category === category && i.size >= min && i.size <= max
        );
        const sortedItems = selectedItems.sort((a, b) => {
          return a.size - b.size;
        });
        onError("");
        setItems(sortedItems);
      }
    } catch (err) {
      onError((err as Error).message);
    }
  }

  return items.length > 0 ? (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="mx-auto max-w-xl rounded-lg bg-sky-200 p-6 shadow-sm transition-colors duration-200 hover:bg-sky-400 hover:text-white"
        >
          <Link to={`${item.id}`}>
            <h3 className="text-2xl font-bold">
              {capitalize(item.category)} &#9679; Size {item.size}
            </h3>
            <p className="mt-2 break-words text-gray-800">{item.description}</p>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <h2 className="mt-6 text-center text-lg text-slate-800">
      No items found with the above criteria.
    </h2>
  );
}

export default ItemList;
