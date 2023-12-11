import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { adminProductInterface } from "../../../interfaces/adminProductInterface";

interface Props {
  register: UseFormRegister<adminProductInterface>;
  error: string | undefined;
  defaultValue: string | number | undefined;
}

const SupplierField = ({ register, error, defaultValue }: Props) => {
  return (
    <TextField
      defaultValue={defaultValue}
      margin="normal"
      fullWidth
      label="supplier"
      {...register("supplier", {
        required: "supplier is required",
        minLength: {
          value: 2,
          message: "Must be at least two characters",
        },
        pattern: {
          value: /^(?=.*[a-zA-Z].*[a-zA-Z])[\w @#$%^&*()_+={};:<>|./?,-]*$/,
          message:
            "Only uppercase letters, lowercase letters and spaces should be entered",
        },
      })}
      error={!!error}
      helperText={error}
    />
  );
};

export default SupplierField;
