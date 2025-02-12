import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import UserList from "./pages/users/user-list";
import UserShow from "./pages/users/user-show";
import UserEdit from "./pages/users/user-edit";
import UserIcon from "@mui/icons-material/People";
import UserCreate from "./pages/users/user-create";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      create={UserCreate}
      icon={UserIcon}
      edit={UserEdit}
    />
  </Admin>
);
