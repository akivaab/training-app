import { useEffect, useState } from "react";
import { CategoryType, ItemSearchMenuPropType } from "../../types/types";
import Alert from "../layout/Alert";
import { useSearchParams } from "react-router-dom";

function ItemSearchMenu({ onSubmit }: ItemSearchMenuPropType) {
  const categories: CategoryType[] = [
    "shirt",
    "pants",
    "shoes",
    "suit",
    "hat",
    "tie"
  ];

  const [searchParams] = useSearchParams();
  const [inputCategory, setInputCategory] = useState<CategoryType | null>(null);
  const [inputMin, setInputMin] = useState<number>(1);
  const [inputMax, setInputMax] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    setInputCategory((searchParams.get("category") as CategoryType) || null);
    setInputMin(parseInt(searchParams.get("min") || "1"));
    setInputMax(parseInt(searchParams.get("max") || "1"));
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputMin > inputMax) {
      setErrorMsg("Error: Invalid size range");
    } else {
      setErrorMsg("");
      onSubmit(inputCategory as CategoryType, inputMin, inputMax);
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
              value={inputMin}
              required
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInputMin(val > 0 ? val : 1);
              }}
              className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
            />
            <span className="text-lg text-gray-800">-</span>
            <input
              type="number"
              placeholder="Max"
              value={inputMax}
              required
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInputMax(val > 0 ? val : 1);
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
