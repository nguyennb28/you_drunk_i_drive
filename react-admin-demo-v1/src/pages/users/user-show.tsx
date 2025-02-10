import { BooleanField, DateField, Show, SimpleShowLayout, TextField } from 'react-admin';

const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <DateField source="date_joined" />
            <TextField source="role" />
            <TextField source="phone" />
        </SimpleShowLayout>
    </Show>
);

export default UserShow;