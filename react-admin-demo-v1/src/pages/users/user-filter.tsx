import { SearchInput, TextInput } from "react-admin";
import { Chip } from "@mui/material";

// const QuickFilter = ({
//   label,
// }: {
//   label: string;
//   source?: string;
//   defaultValue?: any;
// }) => <Chip sx={{ marginBottom: 1 }} label={label} />;

// const postFilter = [
//   <SearchInput source="q" alwaysOn />,
//   <QuickFilter source="admin" label="Role" defaultValue={"admin"} />,
// ];
const postFilters = [
    // <TextInput label="Search" source="q" alwaysOn/>,
    <SearchInput source="q" alwaysOn resettable/>
]

export default postFilters;
