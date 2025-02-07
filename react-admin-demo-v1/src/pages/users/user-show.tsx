import { BooleanField, DateField, Show, SimpleShowLayout, TextField } from 'react-admin';

const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            {/* <TextField source="last_login" /> */}
            {/* <BooleanField source="is_superuser" /> */}
            <TextField source="username" />
            <DateField source="first_name" />
            <DateField source="last_name" />
            {/* <DateField source="email" /> */}
            {/* <BooleanField source="is_staff" /> */}
            <BooleanField source="is_active" />
            <DateField source="date_joined" />
            <TextField source="role" />
            <TextField source="phone" />
            {/* <BooleanField source="is_verified" /> */}
            {/* <TextField source="groups" /> */}
            {/* <TextField source="user_permissions" /> */}
        </SimpleShowLayout>
    </Show>
);

export default UserShow;