import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object()
  .shape({
    username: yup.string().min(10).length(10).max(10).required(),
    phone: yup.string().min(10).length(10).max(10).required(),
    password: yup.string().required(),
    role: yup.string().required(),
  })
  .required();

const userResolver = yupResolver(schema);

export default userResolver;
