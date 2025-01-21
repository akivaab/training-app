import { Link } from "react-router-dom";
import { ItemType } from "../../types/types";

type PropsType = {
  items: ItemType[];
};

function ItemList({ items }: PropsType) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="container mx-auto rounded-md bg-sky-200 p-4 transition-colors duration-75 hover:bg-sky-600 hover:text-white"
        >
          <Link to={`${item.id}`}>
            <h3 className="text-xl">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)},
              Size {item.size}
            </h3>
            <p>{item.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
