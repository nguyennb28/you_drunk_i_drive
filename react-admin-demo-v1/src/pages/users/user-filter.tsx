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
// const postFilters = [
//     <SearchInput source="q" alwaysOn resettable/>
// ]

const QuickFilter = ({
  label,
}: {
  label: string;
  source?: string;
  defaultValue?: any;
}) => <Chip sx={{ marginBottom: 1 }} label={label} />;

const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <QuickFilter label="Driver" source="role" defaultValue={"driver"} />,
];

export default postFilters;
