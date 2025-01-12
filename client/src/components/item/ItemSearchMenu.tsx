import { useState } from "react";
import { CategoryType, SizeRangeType } from "../../api/itemsApi";

type PropsType = {
  onSubmit: (
    newCategory: CategoryType,
    newNumericalSize: SizeRangeType
  ) => void;
};

function ItemSearchMenu({ onSubmit }: PropsType) {
  const categories: CategoryType[] = [
    "shirt",
    "pants",
    "shoes",
    "suit",
    "hat",
    "tie"
  ];

  const [inputCategory, setInputCategory] = useState<CategoryType | null>(null);
  const [inputNumericalSize, setInputNumericalSize] = useState({
    min: "",
    max: ""
  });

  function handleSubmit() {
    const sizeMin = parseInt(inputNumericalSize.min);
    const sizeMax = parseInt(inputNumericalSize.max);
    if (!inputCategory) {
      alert("Select a category");
    } else if (
      isNaN(sizeMin) ||
      isNaN(sizeMax) ||
      inputNumericalSize.min > inputNumericalSize.max
    ) {
      alert("Invalid size range");
    } else {
      onSubmit(inputCategory, { min: sizeMin, max: sizeMax });
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      {/* Category */}
      <label className="text-lg">Choose Category:</label>
      <select
        value={inputCategory || ""}
        onChange={(e) =>
          setInputCategory((e.target.value as CategoryType) || null)
        }
        className="mx-auto w-96 rounded-xl border border-sky-500 px-3 py-2"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Size */}
      <div>
        <label className="text-lg">Size Range:</label>
        <input
          type="number"
          placeholder="Min"
          value={inputNumericalSize.min}
          onChange={(e) =>
            setInputNumericalSize((prev) => ({
              ...prev,
              min: e.target.value
            }))
          }
          className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
        />
        <input
          type="number"
          placeholder="Max"
          value={inputNumericalSize.max}
          onChange={(e) =>
            setInputNumericalSize((prev) => ({
              ...prev,
              max: e.target.value
            }))
          }
          className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="rounded-md bg-sky-500 px-5 py-2 text-white"
      >
        Submit
      </button>
    </div>
  );
}

export default ItemSearchMenu;
