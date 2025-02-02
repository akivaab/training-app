import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, patchItem } from "../../api/itemsApi";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Alert from "../layout/Alert";
import categoryList from "../../util/categoryList";
import capitalize from "../../util/capitalize";
import { CategoryType } from "../../types/types";

function EditItem() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [editSize, setEditSize] = useState<number>(1);
  const [editDescription, setEditDescription] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    handleGetItem();
  }, []);

  async function handleGetItem(): Promise<void> {
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else {
        const itemData = await getItem(axios, id);
        setEditCategory(itemData.category);
        setEditSize(itemData.size);
        setEditDescription(itemData.description);
        setErrorMsg("");
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  async function handleEdit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    try {
      if (!id || !/^\d+$/.test(id)) {
        setErrorMsg(`Error: "${id}" is not a valid item ID.`);
      } else if (editCategory) {
        await patchItem(axios, id, editCategory, editSize, editDescription);
        navigate(`/items/${id}`, { replace: true });
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
            value={editSize}
            onChange={(e) => setEditSize(Math.max(parseInt(e.target.value), 1))}
            className="w-20 rounded-md border border-slate-400 bg-sky-50 p-2 text-center"
          />
        </div>

        {/* Description */}
        <div className="w-full text-center">
          <label className="mb-3 block text-lg font-medium text-sky-600">
            Description:
          </label>
          <textarea
            placeholder="Description"
            required
            maxLength={500}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="mb-2 block h-28 w-full rounded-lg border border-slate-400 bg-sky-50 p-1"
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
