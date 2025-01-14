import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./user/Login";
import AddItem from "./item/AddItem";
import Item from "./item/Item";
import AddUser from "./user/AddUser";
import User from "./user/User";
import UserList from "./user/UserList";
import ItemMainPage from "./item/ItemMainPage";
import EditItem from "./item/EditItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<User />} />
          <Route path="users/login" element={<Login />} />
          <Route path="users/register" element={<AddUser />} />

          <Route path="items" element={<ItemMainPage />} />
          <Route path="items/:id" element={<Item />} />
          <Route path="items/:id/edit" element={<EditItem />} />
          <Route path="items/lend" element={<AddItem />} />

          {/* Error Route Here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
