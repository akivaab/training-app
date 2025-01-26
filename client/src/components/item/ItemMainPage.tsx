import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import ItemSearchMenu from "./ItemSearchMenu";
import { getItems } from "../../api/itemsApi";
import { ItemType, CategoryType, SizeRangeType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Alert from "../layout/Alert";

function ItemMainPage() {
  const axios = useAxiosInstance();
  const [items, setItems] = useState<ItemType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [numericalSize, setNumericalSize] = useState<SizeRangeType>({
    min: 0,
    max: 0
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (category) {
      handleGetItems(category, numericalSize);
    }
  }, [category, numericalSize]);

  async function handleGetItems(
    selectedCategory: CategoryType,
    selectedSizeRange: SizeRangeType
  ) {
    try {
      const allItems = await getItems(axios);
      const categoryItems = allItems.filter(
        (i) => i.category === selectedCategory
      );
      const sizeItems = categoryItems.filter(
        (i) =>
          i.size >= selectedSizeRange.min && i.size <= selectedSizeRange.max
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
    newNumericalSize: SizeRangeType
  ) {
    setCategory(newCategory);
    setNumericalSize(newNumericalSize);
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
