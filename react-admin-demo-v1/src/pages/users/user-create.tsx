import {
  BooleanInput,
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  SelectInput,
  required,
} from "react-admin";
import userResolver from "./user-schema";

// const UserCreate = () => (
//   <Create redirect="list">
//     <SimpleForm warnWhenUnsavedChanges>
//       <TextInput source="username" required/>
//       <TextInput source="phone" required/>
//       <PasswordInput source="password" required/>
//       <SelectInput
//         source="role"
//         choices={[
//             { id: "customer", name: "customer" },
//             { id: "driver", name: "driver" },
//             { id: "admin", name: "admin" },
//         ]}
//         validate={required()} 
//       />
//     </SimpleForm>
//   </Create>
// );

const UserCreate = () => (
    <Create redirect="list">
      <SimpleForm warnWhenUnsavedChanges
      resolver={userResolver}>
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
