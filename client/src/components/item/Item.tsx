// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ItemType } from "../../api/itemsApi";

function Item() {
  // const navigate = useNavigate();
  // const { id } = useParams();
  // const [item, setItem] = useState<ItemType | null>(null);

  // useEffect(() => {
  //   handleGetItem();
  // }, []);

  // async function handleGetItem() {
  //   const data = await getItem(id);
  //   if (data) {
  //     setItem(data);
  //   }
  //   //setIsLoading(false);
  // }

  return (
    <div>
      <div>
        <h2></h2>
      </div>
      <div className="bg-teal-900">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Item;
