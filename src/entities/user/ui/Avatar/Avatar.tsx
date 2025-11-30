import { Avatar as MuiAvatar } from "@mui/material";
import { FC } from "react";
import { type User } from "../../model";

type Props = {
  avatarUrl?: User["avatarUrl"];
  size?: string;
};

export const Avatar: FC<Props> = ({ size, avatarUrl }) => {
  return <MuiAvatar sx={{width: size, height: size}} src={avatarUrl} />;
};
