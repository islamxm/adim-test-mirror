import { useTranslations } from "next-intl";
import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/Container";

import img from "../../../../../public/tl-2.png";
import classes from "./classes.module.scss";

export const HeroSection = () => {
  const t = useTranslations("pages.homePage.HeroSection");

  return (
    <Container>
      <Stack
        className={classes.wrapper}
        sx={{ height: "100vh" }}
        direction={"row"}
        gap={"3rem"}
        alignItems={"center"}
      >
        {/* bg */}
        <div className={cn([classes.bg, classes.bg_top])}>
          <svg
            width="526"
            height="262"
            viewBox="0 0 526 262"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.ellipse
              cx="263"
              rx="263"
              fill="#063B29"
              fillOpacity="0.65"
              initial={{ cy: 0, ry: 0 }}
              animate={{ cy: -123.5, ry: 312.5 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.ellipse
              cx="263"
              rx="263"
              fill="#063B29"
              fillOpacity="0.35"
              initial={{ cy: 0, ry: 0 }}
              animate={{ cy: -87, ry: 349 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
            <motion.circle
              cx="263"
              fill="#063B29"
              initial={{ cy: 0, r: 0 }}
              animate={{ cy: -186, r: 250 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </svg>
        </div>
        <div className={cn([classes.bg, classes.bg_bottom])}>
          <svg
            width="526"
            height="261"
            viewBox="0 0 526 261"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.ellipse
              cx="263"
              rx="263"
              fill="#063B29"
              fillOpacity="0.65"
              transform="rotate(180 263 385.5)"
              initial={{ cy: 261, ry: 0 }}
              animate={{ cy: 385.5, ry: 312.5 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.ellipse
              cx="263"
              rx="263"
              fill="#063B29"
              fillOpacity="0.35"
              transform="rotate(180 263 349)"
              initial={{ cy: 261, ry: 0 }}
              animate={{ cy: 349, ry: 349 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
            <motion.circle
              cx="263"
              fill="#063B29"
              transform="rotate(180 263 448)"
              initial={{ cy: 261, r: 0 }}
              animate={{ cy: 448, r: 250 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </svg>
        </div>
        {/* bg */}
        <Typography
          sx={{
            textTransform: "uppercase",
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            fontSize: "5.4rem",
            lineHeight: "8.4rem",
          }}
          variant="h1"
        >
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t("title1")}
          </motion.span>
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("title2")}
          </motion.span>
          <motion.span
            style={{ display: "block" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t("title3")}
          </motion.span>
        </Typography>
        <Box
          component={motion.div}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          sx={{ flexGrow: 0, flexBasis: "41.9rem" }}
        >
          <Image src={img} alt="test" width={419} height={419} />
        </Box>
        <Typography
          component={motion.span}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, fontWeight: 600 }}
          variant={"subtitle1"}
        >
          {t("descr")}
        </Typography>
      </Stack>
    </Container>
  );
};
