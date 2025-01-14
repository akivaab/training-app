import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postItem } from "../../api/itemsApi";
import { CategoryType } from "../../types/types";

function AddItem() {
  const navigate = useNavigate();
  const categories: CategoryType[] = [
    "shirt",
    "pants",
    "shoes",
    "suit",
    "hat",
    "tie"
  ];
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [size, setSize] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  async function handleSubmit() {
    try {
      if (category && !isNaN(size)) {
        await postItem(category, size, description);
        navigate("/items");
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
        value={category || ""}
        onChange={(e) => setCategory((e.target.value as CategoryType) || null)}
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
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="m-2 w-20 rounded border border-sky-500 px-3 py-2"
        />
      </div>

      <textarea
        className="mb-2 block h-40 w-full rounded-sm border border-slate-400 bg-sky-50 p-1"
        placeholder="Description"
        required
        maxLength={500}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        className="rounded-md bg-sky-500 px-5 py-2 text-white"
      >
        Submit
      </button>
    </div>
  );
}

export default AddItem;
