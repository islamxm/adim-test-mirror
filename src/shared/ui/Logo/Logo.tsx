import { Box, SxProps } from "@mui/material";
import img from "../../../../public/logo-1.svg";
import Image from "next/image";
import { FC } from "react";

type Props = {
  size?: number | string;
  sx?: SxProps
};

export const Logo: FC<Props> = ({ size = "3.2rem", sx }) => {
  return (
    <Box sx={{ width: size, height: size, ...sx }}>
      <Image 
        src={img} 
        alt="" 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain"
        }}
        />
    </Box>
  );
};
