import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Alert from "../layout/Alert";
import categoryList from "../../util/categoryList";
import capitalize from "../../util/capitalize";
import { CategoryType, ItemSearchMenuPropType } from "../../types/types";

function ItemSearchMenu({ onSubmit }: ItemSearchMenuPropType) {
  const [searchParams] = useSearchParams();
  const [inputCategory, setInputCategory] = useState<CategoryType | null>(null);
  const [inputMin, setInputMin] = useState<number>(1);
  const [inputMax, setInputMax] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const categoryParam =
      (searchParams.get("category") as CategoryType) || null;
    const minParam = parseInt(searchParams.get("min") || "1");
    const maxParam = parseInt(searchParams.get("max") || "1");
    if (categoryList.includes(categoryParam as CategoryType)) {
      setInputCategory(categoryParam as CategoryType);
    } else {
      setInputCategory(null);
    }
    if (
      !isNaN(minParam) &&
      !isNaN(maxParam) &&
      minParam > 0 &&
      maxParam > 0 &&
      minParam <= maxParam
    ) {
      setInputMin(minParam);
      setInputMax(maxParam);
    }
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
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
            required
            value={inputCategory || ""}
            onChange={(e) =>
              setInputCategory((e.target.value as CategoryType) || null)
            }
            className="w-7/12 rounded-xl border border-slate-400 bg-sky-50 px-4 py-3 text-gray-800"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {capitalize(cat)}
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
              required
              value={inputMin}
              onChange={(e) =>
                setInputMin(Math.max(parseInt(e.target.value), 1))
              }
              className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
            />
            <span className="text-lg text-gray-800">-</span>
            <input
              type="number"
              placeholder="Max"
              required
              value={inputMax}
              onChange={(e) =>
                setInputMax(Math.max(parseInt(e.target.value), 1))
              }
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
