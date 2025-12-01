import { Paper, Stack, Typography } from "@mui/material";
import img from "../../../../../public/category-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Category } from "../../model";



export const CategoryCard:FC<Category> = ({
  name,
  iconPath,
}) => {
  return (
    <Paper
      sx={(theme) => ({
        height: "250px",
        borderRadius: "1.4rem",
        p: "3.4rem",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      })}
      elevation={0}
      component={Link}
      href={"#"}
    >
      <Stack gap={"2.4rem"}>
        <Image src={img} alt="" />
        <Typography variant={"h2"} textTransform={"uppercase"}>{name}</Typography>
        {/* <Typography variant={"body2"}>
          Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus
          sit ac. Tellus ac cras in metus curabitur aliquet.
        </Typography> */}
      </Stack>
    </Paper>
  );
};
