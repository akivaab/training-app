import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, patchItem } from "../../api/itemsApi";
import { CategoryType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Alert from "../layout/Alert";

function EditItem() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [editSize, setEditSize] = useState<number>(1);
  const [editDescription, setEditDescription] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const categories: CategoryType[] = [
    "shirt",
    "pants",
    "shoes",
    "suit",
    "hat",
    "tie"
  ];

  useEffect(() => {
    handleGetItem();
  }, []);

  async function handleGetItem() {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
        return;
      }
      const itemData = await getItem(axios, id);
      if (itemData) {
        setEditCategory(itemData.category);
        setEditSize(itemData.size);
        setEditDescription(itemData.description);
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else if (editCategory && !isNaN(editSize)) {
        await patchItem(axios, id, editCategory, editSize, editDescription);
        navigate(`/items/${id}`, { replace: true });
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <form className="mx-auto mt-8 max-w-3xl p-6" onSubmit={handleEdit}>
        {/* Category */}
        <div className="mb-6 text-center">
          <label className="mb-2 block text-lg font-medium text-sky-600">
            Choose Category:
          </label>
          <select
            required
            value={editCategory || ""}
            onChange={(e) =>
              setEditCategory((e.target.value as CategoryType) || null)
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
            Size:
          </label>
          <input
            type="number"
            placeholder="Size"
            required
            value={editSize}
            onChange={(e) =>
              setEditSize(
                parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1
              )
            }
            className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
          />
        </div>

        {/* Description */}
        <div className="w-full text-center">
          <label className="mb-3 block text-lg font-medium text-sky-600">
            Description:
          </label>
          <textarea
            className="mb-2 block h-28 w-full rounded-lg border border-slate-400 bg-sky-50 p-1"
            placeholder="Description"
            required
            maxLength={500}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="mx-auto mt-8 block w-full max-w-sm rounded-lg bg-sky-500 py-3 text-white transition-colors duration-100 hover:bg-sky-400"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}

export default EditItem;
