import { BooleanField, Datagrid, DateField, List, TextField } from 'react-admin';
import postFilters from './user-filter';
const UserList = () => (
    <List filters={postFilters}>
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