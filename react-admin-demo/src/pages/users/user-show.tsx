import { ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";

const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="phone" />
        </SimpleShowLayout>
    </Show>
);

export default UserShow;
