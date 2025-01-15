import { useState } from "react";
import { CategoryType, SizeRangeType } from "../../types/types";

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
    min: 0,
    max: 0
  });

  function handleSubmit() {
    const sizeMin = inputNumericalSize.min;
    const sizeMax = inputNumericalSize.max;
    if (!inputCategory) {
      alert("Select a category");
    } else if (inputNumericalSize.min > inputNumericalSize.max) {
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
        className="mx-auto w-96 rounded-xl border border-slate-400 px-3 py-2"
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
      <div className="flex flex-col text-center">
        <label className="text-lg">Size Range:</label>
        <div className="mt-2">
          <input
            type="number"
            placeholder="Min"
            value={inputNumericalSize.min}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setInputNumericalSize((prev) => ({
                ...prev,
                min: val >= 0 ? val : 0
              }));
            }}
            className="mx-2 mb-2 w-20 rounded-md border border-slate-400 p-1"
          />
          -
          <input
            type="number"
            placeholder="Max"
            value={inputNumericalSize.max}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setInputNumericalSize((prev) => ({
                ...prev,
                max: val >= 0 ? val : 0
              }));
            }}
            className="mx-2 mb-2 w-20 rounded-md border border-slate-400 p-1"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="rounded-md bg-teal-900 px-5 py-2 text-white transition-colors duration-100 hover:bg-teal-700"
      >
        Submit
      </button>
    </div>
  );
}

export default ItemSearchMenu;
