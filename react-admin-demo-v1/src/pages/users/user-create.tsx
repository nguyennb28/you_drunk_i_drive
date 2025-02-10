import {
  BooleanInput,
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  SelectInput,
  required,
} from "react-admin";

const UserCreate = () => (
  <Create redirect="list">
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="username" required/>
      <TextInput source="phone" required/>
      <PasswordInput source="password" required/>
      <SelectInput
        source="role"
        choices={[
            { id: "customer", name: "customer" },
            { id: "driver", name: "driver" },
            { id: "admin", name: "admin" },
        ]}
        validate={required()} 
      />
    </SimpleForm>
  </Create>
);

export default UserCreate;
