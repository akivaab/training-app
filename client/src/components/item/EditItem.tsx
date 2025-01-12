import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CategoryType, putItem } from "../../api/itemsApi";
import { useState } from "react";

function EditItem() {
  const location = useLocation();
  const { category, size, description } = location.state || {};
  const navigate = useNavigate();
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

  async function handleEdit() {
    try {
      if (id && editCategory && !isNaN(editSize)) {
        await putItem(id, editCategory, editSize, editDescription);
        navigate(`/items/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      {/* Category */}
      <label className="text-lg">Choose Category:</label>
      <select
        required
        value={editCategory || ""}
        onChange={(e) =>
          setEditCategory((e.target.value as CategoryType) || null)
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
        <label className="text-lg">Size:</label>
        <input
          type="number"
          placeholder="Size"
          required
          value={editSize}
          onChange={(e) => setEditSize(parseInt(e.target.value))}
          className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
        />
      </div>

      <textarea
        className="mb-2 block h-40 w-full rounded-sm border border-slate-400 bg-sky-50 p-1"
        placeholder="Description"
        required
        maxLength={500}
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
      ></textarea>

      <button
        onClick={handleEdit}
        className="rounded-md bg-sky-500 px-5 py-2 text-white"
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditItem;
