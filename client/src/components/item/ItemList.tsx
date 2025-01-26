import { Link } from "react-router-dom";
import { ItemListPropType } from "../../types/types";

function ItemList({ items }: ItemListPropType) {
  return items.length > 0 ? (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="mx-auto max-w-xl rounded-lg bg-sky-200 p-6 shadow-sm transition-colors duration-200 hover:bg-sky-400 hover:text-white"
        >
          <Link to={`${item.id}`}>
            <h3 className="text-2xl font-bold">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}{" "}
              &#9679; Size {item.size}
            </h3>
            <p className="mt-2 text-gray-800">{item.description}</p>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <h2 className="mt-6 text-center text-lg text-slate-800">
      No items found with the above criteria.
    </h2>
  );
}

export default ItemList;
