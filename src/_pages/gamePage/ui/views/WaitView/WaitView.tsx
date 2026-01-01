import { Box, Button, Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { Player } from "../../Player/Player";
import { userApi } from "@/entities/user";
import { FC } from "react";
import { Versus } from "../../Versus/Versus";
import { ChevronRightDuo } from "@/shared/ui/icons";

type Props = {
  selfStatus: any;
  opponentStatus: any;
  opponentData: any;
  onReady?: () => void;
  onSkipPlayer?: () => void;
};

export const WaitView: FC<Props> = ({
  selfStatus,
  opponentStatus,
  opponentData,
  onReady,
  onSkipPlayer
}) => {
  const { data } = userApi.useGetUserProfileQuery(undefined);

  return (
    <Stack
      gap={"3rem"}
      justifyContent={"center"}
      sx={{ height: "100%", position: "relative" }}
    >
      <Stack
        alignItems={"flex-start"}
        direction={"row"}
        gap={"11rem"}
        justifyContent={"center"}
        component={motion.div}
      >
        <motion.div layoutId="player" layout="preserve-aspect">
          <Player
            data={{
              profileName: data?.profileName,
              avatarUrl: data?.avatarUrl,
              leagueName: data?.leagueName,
            }}
            status={selfStatus}
            size="22rem"
          />
        </motion.div>
        <Box sx={{ height: "20rem", width: "20rem", flex: "0 0 auto" }}>
          <AnimatePresence>
            <Box
              pt={"2.1rem"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              component={motion.div}
              exit={{ opacity: 0 }}
            >
              <Versus />
            </Box>
          </AnimatePresence>
        </Box>
        <motion.div style={{position: "relative"}} layoutId="opponent">
          <Player
            data={{
              profileName: opponentData?.opponentId.profileName,
              avatarUrl: opponentData?.opponentId.avatarUrl,
              leagueName: opponentData?.opponentId?.leagueName,
            }}
            status={opponentStatus}
            size="22rem"
          />
          <Button
            sx={{
              position: "absolute",
              top: "8rem",
              right: 0,
              transform: "translateX(calc(100% + 10px))",
              height: "6rem",
            }}
            endIcon={<ChevronRightDuo />}
            onClick={onSkipPlayer}
          >
            Skip player
          </Button>
        </motion.div>
      </Stack>
      <Stack gap={"1rem"} direction={"row"} justifyContent={"center"}>
        <Button variant={"contained"} onClick={onReady} color={"primary"}>
          READY
        </Button>
      </Stack>
    </Stack>
  );
};
