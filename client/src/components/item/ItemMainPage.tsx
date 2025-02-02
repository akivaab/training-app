import { useState } from "react";
import ItemSearchMenu from "./ItemSearchMenu";
import ItemList from "./ItemList";
import Alert from "../layout/Alert";

function ItemMainPage() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  return (
    <>
      {errorMsg && <Alert message={errorMsg} />}
      <ItemSearchMenu onError={setErrorMsg} />
      <hr className="mx-auto w-4/5" />
      <ItemList onError={setErrorMsg} />
    </>
  );
}

export default ItemMainPage;
