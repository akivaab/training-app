import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddItem from "./item/AddItem";
import Item from "./item/Item";
import AddUser from "./user/AddUser";
import User from "./user/User";
import UserList from "./user/UserList";
import ItemMainPage from "./item/ItemMainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>

          <Route path="users" element={<UserList />}>
            <Route path="register" element={<AddUser />}></Route>
            <Route path=":id" element={<User />}></Route>
          </Route>

          <Route path="items" element={<ItemMainPage />}>
            <Route path="lend" element={<AddItem />}></Route>
            <Route path=":id" element={<Item />}></Route>
          </Route>

          {/* Error Route Here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
