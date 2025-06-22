import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@radix-ui/react-popover";
import { useState, type SyntheticEvent } from "react";
import { Button } from "../ui/button";
import { Ellipsis, Flag, Pen, Trash } from "lucide-react";
import { useAuth } from "../../Context/useAuth";
import { hasPermission, type Role } from "../../Helpers/RoleBasedAccessControl";

interface Props {
  onDelete: (e: SyntheticEvent) => void;
  userId: string;
}

const ChatMenu = ({ onDelete, userId }: Props) => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const userPermissions: {
    id: string;
    role: Role;
    username: string;
    emailAddress: string;
  } = {
    id: user?.id ?? "0",
    role: user?.role ?? "Anonymous",
    username: user?.username ?? "anon",
    emailAddress: user?.emailAddress ?? "anon@mail.com",
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hover:!text-blue-500 w-[24px] dark:hover:!bg-[var(--color_appledark)] hover:!bg-[var(--color_applewhite)] cursor-pointer"
        >
          <Ellipsis strokeWidth={1} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent className="w-auto p-0 !border-gray-500 !border-1 rounded-sm dark:border-gray-200 bg-[var(--color_applewhite)] dark:bg-[var(--color_appledark)]">
          <div className="flex flex-col">
            {hasPermission(userPermissions, "update:ownChats") &&
              user?.id === userId && (
                <Button variant="ghost">
                  Edit <Pen size={16} strokeWidth={1} />
                </Button>
              )}
            {(hasPermission(userPermissions, "delete:chats") ||
              (hasPermission(userPermissions, "delete:ownChats") &&
                user?.id === userId)) && (
              <Button
                variant="ghost"
                className="text-red-600 text-right dark:text-red-400 hover:text-red-600"
                type="button"
                onClick={onDelete}
              >
                Delete <Trash size={16} strokeWidth={1} />
              </Button>
            )}
            <Button
              className="text-red-600 text-right dark:text-red-400 hover:text-red-600 flex p-auto"
              variant="ghost"
            >
              Report
              <Flag size={16} strokeWidth={1} className="ml-2" />
            </Button>
          </div>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default ChatMenu;
