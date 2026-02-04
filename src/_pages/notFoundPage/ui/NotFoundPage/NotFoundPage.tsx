"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button, Stack, Typography } from "@mui/material";

import img from "../../../../../public/error-img.png";

export const NotFoundPage = () => {
  const t = useTranslations("pages.notFoundPage.NotFoundPage");
  return (
    <Stack gap={"1rem"} justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
      <Image
        src={img}
        alt="Not found"
        width={250}
        height={250}
        style={{ filter: "grayscale(1)" }}
      />
      <Typography variant="h3">{t("title")}</Typography>
      <Button variant="contained">{t("button")}</Button>
    </Stack>
  );
};
