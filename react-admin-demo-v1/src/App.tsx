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

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
    {/* <Resource name="posts" list={ListGuesser}/> */}
    <Resource name="users" list={UserList} show={UserShow}/>
  </Admin>
);
