import { Avatar } from "@mui/material";
import { User } from "lucide-react";
import { getInitials } from "utils/text";

export default function MyAvatar({
  user,
  width = 48,
  height = 48,
  fontSize = "1.125rem",
}: {
  user: {
    isDeleted: boolean;
    isActive: boolean;
    img: string | null | undefined;
    name: string;
  };
  width?: number;
  height?: number;
  fontSize?: string;
}) {
  return (
    <Avatar
      src={
        !user.isDeleted && user.isActive ? (user.img ?? undefined) : undefined
      }
      alt="image"
      sx={{
        width: width,
        height: height,
        bgcolor: "black",
        fontSize: fontSize,
      }} // fontSize = text-lg
    >
      {!user.isDeleted && user.isActive ? (
        getInitials(user.name)
      ) : (
        <User size={20} color="white" />
      )}
    </Avatar>
  );
}
