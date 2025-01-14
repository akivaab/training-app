import { Link } from "react-router-dom";
import { ItemType } from "../../types/types";

type PropsType = {
  items: ItemType[];
};

function ItemList({ items }: PropsType) {
  return (
    <div>
      {items.map((item) => (
        <Link
          to={`${item.id}`}
          key={item.id}
          className="container mx-auto bg-blue-400 text-white"
        >
          {item.description}
        </Link>
      ))}
    </div>
  );
}

export default ItemList;
