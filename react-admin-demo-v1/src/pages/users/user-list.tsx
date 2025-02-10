import { BooleanField, Datagrid, DateField, List, TextField } from 'react-admin';
const UserList = () => (
    <List>
        <Datagrid>
            {/* <TextField source="id" /> */}
            {/* <TextField source="last_login" /> */}
            {/* <BooleanField source="is_superuser" /> */}
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            {/* <DateField source="email" /> */}
            {/* <BooleanField source="is_staff" /> */}
            {/* <BooleanField source="is_active" /> */}
            {/* <DateField source="date_joined" /> */}
            <TextField source="role" />
            <TextField source="phone" />
            {/* <BooleanField source="is_verified" /> */}
            {/* <TextField source="groups" /> */}
            {/* <TextField source="user_permissions" /> */}
        </Datagrid>
    </List>
);

export default UserList;