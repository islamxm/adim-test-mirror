import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Paper, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";

import img from "../../../../../public/category-icon.svg";
import { Category } from "../../model";

export const CategoryCard: FC<Category> = ({ name, iconPath }) => {
  const { palette } = useTheme();
  return (
    <Link href={"#"}>
      <Paper
        sx={(theme) => ({
          display: "block",
          height: "250px",
          borderRadius: "1.4rem",
          p: "3.4rem",
          color: theme.palette.primary.main,
          flexGrow: 1,
          // "&:hover": {
          //   backgroundColor: theme.palette.primary.main,
          //   color: theme.palette.common.white,
          // },
        })}
        component={motion.div}
        whileHover={{
          backgroundColor: palette.primary.main,
          color: palette.common.white,
          scale: 1.05,
        }}
        transition={{ duration: 0.2 }}
      >
        <Stack gap={"2.4rem"}>
          <Image src={img} alt="" />
          <Typography variant={"h2"} textTransform={"uppercase"}>
            {name}
          </Typography>
          {/* <Typography variant={"body2"}>
          Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus
          sit ac. Tellus ac cras in metus curabitur aliquet.
        </Typography> */}
        </Stack>
      </Paper>
    </Link>
  );
};
