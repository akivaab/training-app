import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import ItemSearchMenu from "./ItemSearchMenu";
import { getItems } from "../../api/itemsApi";
import { ItemType, CategoryType, SizeRangeType } from "../../types/types";

function ItemMainPage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [numericalSize, setNumericalSize] = useState<SizeRangeType>({
    min: 0,
    max: 0
  });

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
      const allItems = await getItems();
      const categoryItems = allItems.filter(
        (i) => i.category === selectedCategory
      );
      const sizeItems = categoryItems.filter(
        (i) =>
          i.size >= selectedSizeRange.min && i.size <= selectedSizeRange.max
      );
      setItems(sizeItems);
    } catch (err) {
      console.error(err);
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
      <ItemSearchMenu onSubmit={handleSearchMenuSubmit} />
      <hr />
      <ItemList items={items} />
    </>
  );
}

export default ItemMainPage;
