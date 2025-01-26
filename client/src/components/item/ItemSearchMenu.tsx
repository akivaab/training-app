import { useState } from "react";
import { CategoryType, SizeRangeType } from "../../types/types";
import Alert from "../layout/Alert";

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
    min: 1,
    max: 1
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sizeMin = inputNumericalSize.min;
    const sizeMax = inputNumericalSize.max;
    if (sizeMin > sizeMax) {
      setErrorMsg("Invalid size range");
    } else {
      onSubmit(inputCategory as CategoryType, { min: sizeMin, max: sizeMax });
    }
  }

  return (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <form className="mx-auto mt-8 max-w-3xl p-6" onSubmit={handleSubmit}>
        {/* Category */}
        <div className="mb-6 text-center">
          <label className="mb-2 block text-lg font-medium text-sky-600">
            Choose Category:
          </label>
          <select
            value={inputCategory || ""}
            required
            onChange={(e) =>
              setInputCategory((e.target.value as CategoryType) || null)
            }
            className="w-7/12 rounded-xl border border-slate-400 bg-sky-50 px-4 py-3 text-gray-800"
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
        </div>

        {/* Size */}
        <div className="mb-6 text-center">
          <label className="mb-3 block text-lg font-medium text-sky-600">
            Size Range:
          </label>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="number"
              placeholder="Min"
              value={inputNumericalSize.min}
              required
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInputNumericalSize((prev) => ({
                  ...prev,
                  min: val > 0 ? val : 1
                }));
              }}
              className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
            />
            <span className="text-lg text-gray-800">-</span>
            <input
              type="number"
              placeholder="Max"
              value={inputNumericalSize.max}
              required
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInputNumericalSize((prev) => ({
                  ...prev,
                  max: val > 0 ? val : 1
                }));
              }}
              className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mx-auto mt-8 block w-full max-w-sm rounded-lg bg-sky-500 py-3 text-white transition-colors duration-100 hover:bg-sky-400"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default ItemSearchMenu;
