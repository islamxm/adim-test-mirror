import Image from "next/image";

import {
  screenFillingCircleActions,
  setCallback_screenFillingCircle,
} from "@/animations/screen-filling-circle";
import { Stack, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";

import { useDispatch, useRouterProgress } from "@/shared/lib";
import { getGamePage } from "@/shared/model";
import { GlowingButton } from "@/shared/ui";
import { ArrowRightIcon } from "@/shared/ui/icons";

import img from "../../../../../../public/boy-1.png";

export const HistoryModalEmpty = () => {
  const { palette } = useTheme();
  const router = useRouterProgress();
  const dispatch = useDispatch();

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      gap={"3.4rem"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack alignItems={"center"}>
        <Image src={img} width={290} height={290} alt="Boy" />
        <Typography sx={{ fontSize: "2.2rem", fontWeight: 600 }} align="center">
          Вы пока не соревновались!
        </Typography>
        <Typography sx={{ fontSize: "2.2rem", fontWeight: 700 }} align="center">
          Играйте прямо сейчас
        </Typography>
      </Stack>
      <GlowingButton
        endIcon={<ArrowRightIcon />}
        variant={"contained"}
        onClick={(e) => {
          setCallback_screenFillingCircle("1", () => router.push(getGamePage()));
          dispatch(
            screenFillingCircleActions.start({
              x: e.clientX,
              y: e.clientY,
              color: palette.primary.main,
              completeCbId: "1",
            }),
          );
        }}
      >
        {"Let's play"}
      </GlowingButton>
    </Stack>
  );
};
