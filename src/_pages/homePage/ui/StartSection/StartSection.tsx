"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Box, Button, Stack, Typography } from "@mui/material";

import { Container } from "@/shared/ui/Container";
import { ArrowRightIcon } from "@/shared/ui/icons";

import img from "./assets/promo-img.png";
import classes from "./classes.module.scss";

export const StartSection = () => {
  const t = useTranslations("pages.homePage.StartSection");

  return (
    <Box
      sx={(theme) => ({
        py: "3.5rem",
        backgroundColor: theme.palette.background.default,
      })}
      className={classes.wrapper}
    >
      <Container>
        <div className={classes.body}>
          <div className={classes.bg}>
            <Image src={img} alt="" />
            <div className={classes.mask}></div>
          </div>
          <Box className={classes.content}>
            <Stack
              alignItems={"flex-start"}
              justifyContent={"center"}
              sx={(theme) => ({ color: theme.palette.common.white })}
              gap={"2.4rem"}
              className={classes.content_in}
            >
              <Typography sx={{ fontSize: "5.4rem", textTransform: "uppercase" }} variant={"h2"}>
                {t("title")}
              </Typography>
              <Typography variant={"subtitle1"}>{t("subtitle")}</Typography>
              <Button endIcon={<ArrowRightIcon />} variant={"contained"}>
                {t("start_button")}
              </Button>
            </Stack>
          </Box>
        </div>
      </Container>
    </Box>
  );
};
