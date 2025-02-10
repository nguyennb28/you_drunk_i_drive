import {
  BooleanInput,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
} from "react-admin";

const UserEdit = () => (
  <Edit redirect="list">
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="username" required />
      <PasswordInput source="password" required />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <SelectInput
        source="role"
        choices={[
          { id: "customer", name: "customer" },
          { id: "driver", name: "driver" },
          { id: "admin", name: "admin" },
        ]}
        validate={required()}
      />
      <TextInput source="phone" required />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
