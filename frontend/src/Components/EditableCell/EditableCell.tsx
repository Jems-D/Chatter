import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  initialValue: string;
  onRoleChange: (newRole: string) => void;
}

const EditableCell = ({ initialValue, onRoleChange }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onRoleChange?.(newValue);
  };

  return (
    <div className="grid place-items-center-safe">
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select a Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EditableCell;
