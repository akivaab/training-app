import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { patchItem } from "../../api/itemsApi";
import { CategoryType } from "../../types/types";
import useAxiosInstance from "../../hooks/useAxiosInstance";

function EditItem() {
  const location = useLocation();
  const { category, size, description } = location.state || {};
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { id } = useParams();
  const [editCategory, setEditCategory] = useState<CategoryType | null>(
    category
  );
  const [editSize, setEditSize] = useState<number>(size);
  const [editDescription, setEditDescription] = useState<string>(description);
  const categories: CategoryType[] = [
    "shirt",
    "pants",
    "shoes",
    "suit",
    "hat",
    "tie"
  ];

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (id && editCategory && !isNaN(editSize)) {
        await patchItem(axios, id, editCategory, editSize, editDescription);
        navigate(`/items/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
  );
}

export default EditItem;
