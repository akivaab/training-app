import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import ItemSearchMenu from "./ItemSearchMenu";
import { getItems } from "../../api/itemsApi";
import { ItemType, CategoryType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Alert from "../layout/Alert";
import { useSearchParams } from "react-router-dom";

function ItemMainPage() {
  const axios = useAxiosInstance();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<ItemType[]>([]);
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
  ) {
    try {
      const allItems = await getItems(axios);
      const categoryItems = allItems.filter(
        (i) => i.category === selectedCategory
      );
      const sizeItems = categoryItems.filter(
        (i) => i.size >= selectedMin && i.size <= selectedMax
      );
      const sortedItems = sizeItems.sort((a: ItemType, b: ItemType) => {
        return a.size - b.size;
      });
      setItems(sortedItems);
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  function handleSearchMenuSubmit(
    newCategory: CategoryType,
    newMin: number,
    newMax: number
  ) {
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
