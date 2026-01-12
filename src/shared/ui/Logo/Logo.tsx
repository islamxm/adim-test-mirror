import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Box, SxProps } from "@mui/material";

import { getHomePage } from "@/shared/model";

import img from "../../../../public/logo-1.svg";

type Props = {
  size?: number | string;
  sx?: SxProps;
};

export const Logo: FC<Props> = ({ size = "3.2rem", sx }) => {
  return (
    <Box
      component={Link}
      sx={{ display: "block", width: size, height: size, ...sx }}
      href={getHomePage()}
    >
      <Image
        src={img}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};
