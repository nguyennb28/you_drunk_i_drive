import {
  BooleanInput,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
} from "react-admin";

const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="last_login" />
      <BooleanInput source="is_superuser" />
      <TextInput source="username" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <BooleanInput source="is_staff" />
      <BooleanInput source="is_active" />
      <DateInput source="date_joined" />
      <TextInput source="role" />
      <TextInput source="phone" />
      <BooleanInput source="is_verified" />
      <TextInput source="groups" />
      <TextInput source="user_permissions" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
