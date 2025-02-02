import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postItem } from "../../api/itemsApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Alert from "../layout/Alert";
import categoryList from "../../util/categoryList";
import capitalize from "../../util/capitalize";
import { CategoryType } from "../../types/types";

function AddItem() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [size, setSize] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      if (category) {
        const newItemId = await postItem(axios, category, size, description);
        navigate(`/items/${newItemId}`);
      } else {
        setErrorMsg("Error: Select a category.");
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
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
            value={category || ""}
            onChange={(e) =>
              setCategory((e.target.value as CategoryType) || null)
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
            Size:
          </label>
          <input
            type="number"
            placeholder="Size"
            required
            value={size}
            onChange={(e) => setSize(Math.max(parseInt(e.target.value), 1))}
            className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
          />
        </div>

        {/* Description */}
        <div className="w-full text-center">
          <label className="mb-3 block text-lg font-medium text-sky-600">
            Description:
          </label>
          <textarea
            placeholder="Describe the item in detail..."
            required
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 block h-28 w-full rounded-lg border border-slate-400 bg-sky-50 p-1"
          ></textarea>
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

export default AddItem;
