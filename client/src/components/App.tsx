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
import EditItem from "./item/EditItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route path="users" element={<UserList />} />
          <Route path="users/register" element={<AddUser />} />
          <Route path="users/:id" element={<User />} />

          <Route path="items" element={<ItemMainPage />} />
          <Route path="items/lend" element={<AddItem />} />
          <Route path="items/:id" element={<Item />} />
          <Route path="items/:id/edit" element={<EditItem />} />

          {/* Error Route Here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
