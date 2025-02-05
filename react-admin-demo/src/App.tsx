import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import PostList from "./pages/posts/post-list";
import PostEdit from "./pages/posts/post-edit";
import PostShow from "./pages/posts/post-show";
import PostCreate from "./pages/posts/post-create";
import UserList from "./pages/users/user-list";
import UserShow from "./pages/users/user-show";
import UserEdit from "./pages/users/user-edit";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import { HomePage } from "./pages/homepage";
import authProvider from "./authProvider";
import { Person } from "@mui/icons-material";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    dashboard={HomePage}
    authProvider={authProvider}
    title="Test Demo"
  >
    <Resource
      icon={ArticleIcon}
      name="posts"
      list={PostList}
      show={PostShow}
      edit={PostEdit}
      create={PostCreate}
    />
    {/* <Resource
      icon={PersonIcon}
      name="api/users/"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
    /> */}

    <Resource
      icon={PersonIcon}
      name="api/users/"
      list={ListGuesser}
    />
    
  </Admin>
);
