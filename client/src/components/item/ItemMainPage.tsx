import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getItems } from "../../api/itemsApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import ItemList from "./ItemList";
import ItemSearchMenu from "./ItemSearchMenu";
import Alert from "../layout/Alert";
import { ItemType, CategoryType } from "../../types/types";

function ItemMainPage() {
  const axios = useAxiosInstance();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<
    Pick<ItemType, "id" | "category" | "size" | "description">[]
  >([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const category = searchParams.get("category") as CategoryType | null;
    const min = parseInt(searchParams.get("min") || "0");
    const max = parseInt(searchParams.get("max") || "0");
    if (category) {
      handleGetItems(category, min, max);
    } else {
      setItems([]);
    }
  }, [searchParams]);

  async function handleGetItems(
    selectedCategory: CategoryType,
    selectedMin: number,
    selectedMax: number
  ): Promise<void> {
    try {
      const allItems = await getItems(axios);
      const selectedItems = allItems.filter(
        (i) =>
          i.category === selectedCategory &&
          i.size >= selectedMin &&
          i.size <= selectedMax
      );
      const sortedItems = selectedItems.sort((a, b) => {
        return a.size - b.size;
      });
      setErrorMsg("");
      setItems(sortedItems);
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  function handleSearchMenuSubmit(
    newCategory: CategoryType,
    newMin: number,
    newMax: number
  ): void {
    setSearchParams({
      category: newCategory,
      min: newMin.toString(),
      max: newMax.toString()
    });
  }

  return (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <ItemSearchMenu onSubmit={handleSearchMenuSubmit} />
      <hr className="mx-auto w-4/5" />
      <ItemList items={items} />
    </>
  );
}

export default ItemMainPage;
