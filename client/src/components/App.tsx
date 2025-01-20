import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./auth/Login";
import AddItem from "./item/AddItem";
import Item from "./item/Item";
import Register from "./auth/Register";
import User from "./user/User";
import UserList from "./user/UserList";
import ItemMainPage from "./item/ItemMainPage";
import EditItem from "./item/EditItem";
import RequireAuth from "./auth/RequireAuth";
import Unauthorized from "./auth/Unauthorized";
import Missing from "./pages/Missing";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="auth">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>

            <Route path="users">
              <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route index element={<UserList />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
                <Route path=":id" element={<User />} />
              </Route>
            </Route>

            <Route path="items">
              <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
                <Route index element={<ItemMainPage />} />
                <Route path=":id" element={<Item />} />
                <Route path="lend" element={<AddItem />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path=":id/edit" element={<EditItem />} />
              </Route>
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
