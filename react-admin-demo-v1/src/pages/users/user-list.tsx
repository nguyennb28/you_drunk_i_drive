import { BooleanField, Datagrid, DateField, List, TextField } from 'react-admin';
const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="role" />
            <TextField source="phone" />
        </Datagrid>
    </List>
);

export default UserList;