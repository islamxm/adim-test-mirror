"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  screenFillingCircleActions,
  setCallback_screenFillingCircle,
} from "@/animations/screen-filling-circle";
import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { useDispatch } from "@/shared/lib";
import { getGamePage } from "@/shared/model";
import { GlowingButton } from "@/shared/ui";
import { ArrowRightIcon, InfoCircleIcon } from "@/shared/ui/icons";

import { competitionApi } from "@/entities/competition";

import { ShowHistoryButton } from "@/features/game/show-history";

import { PageEnterAnimationLayout } from "@/widgets/pageEnterAnimationLayout";

import leftImg from "../../assets/points-start-left.png";
import rightImg from "../../assets/points-start-right.png";
import { ProgressPanel } from "../ProgressPanel/ProgressPanel";

const getPercent = (total: number, part: number) => {
  const result = Math.round((part / total) * 100);
  if (isNaN(result)) {
    return 0;
  }
  return result;
};

export const PointsPage = () => {
  const { data } = competitionApi.useGetUserStatsQuery({});
  const dispatch = useDispatch();
  const router = useRouter();

  if (!data) {
    return null;
  }

  return (
    <PageEnterAnimationLayout>
      <Box sx={{ height: "100%", pt: "9.8rem" }}>
        <Stack
          gap={"6.4rem"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "100%" }}
        >
          <Stack direction={"row"}>
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              sx={{
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                },
              }}
            >
              <Image src={leftImg} alt="" width={290} height={290} objectFit={"contain"} />
            </Box>
            <Stack
              gap={"4rem"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ flex: "0 0 auto", maxWidth: "49rem" }}
            >
              <Typography textAlign={"center"} variant="h1">
                Compete and get more points
              </Typography>
              <Typography textAlign={"center"} sx={{ fontSize: "1.8rem" }}>
                Lorem ipsum at in lacus sed at eu tellus nunc faucibus pretium auctor orci aenean.
              </Typography>
              <Stack gap={"2rem"} direction={"row"}>
                <GlowingButton
                  endIcon={<ArrowRightIcon />}
                  variant={"contained"}
                  onClick={(e) => {
                    setCallback_screenFillingCircle("1", () => router.push(getGamePage()));
                    dispatch(
                      screenFillingCircleActions.start({
                        x: e.clientX,
                        y: e.clientY,
                        color: "#063B29",
                        completeCbId: "1",
                      }),
                    );
                  }}
                >
                  {"Let's play"}
                </GlowingButton>
                <ShowHistoryButton />
                <Button variant={"outlined"}>
                  <InfoCircleIcon sx={{ fontSize: "2.4rem" }} />
                </Button>
              </Stack>
              <Stack
                component={motion.div}
                gap={"2.4rem"}
                direction={"row"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                >
                  <ProgressPanel
                    title="Wins"
                    value={data.wins}
                    percent={getPercent(data.totalMatches, data.wins)}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                >
                  <ProgressPanel
                    title="Competitions"
                    value={data.totalMatches}
                    percent={data.totalMatches > 0 ? 100 : 0}
                  />
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                >
                  <ProgressPanel
                    title="Loses"
                    value={data.losses}
                    percent={getPercent(data.totalMatches, data.losses)}
                  />
                </motion.div>
              </Stack>
            </Stack>
            <Box
              sx={{
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                },
              }}
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image src={rightImg} alt="" width={290} height={290} objectFit={"contain"} />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </PageEnterAnimationLayout>
  );
};
