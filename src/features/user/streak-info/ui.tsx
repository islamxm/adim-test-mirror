import { Box, Popover } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { motion } from "motion/react";

import { useSelector } from "@/shared/lib";

import { StreakDetailsPanel, StreakPanel, userApi } from "@/entities/user";

export const StreakInfo = () => {
  const { isAuth } = useSelector((s) => s.user);
  const { data, isError } = userApi.useGetHomeUserDataQuery(undefined, {
    skip: !isAuth,
  });

  if (isError || !data) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <PopupState variant={"popover"} popupId={"streak-info"}>
        {(popupState) => (
          <>
            <Box {...bindTrigger(popupState)}>
              <StreakPanel data={data.userStreak.daysForPoint} />
            </Box>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ mt: "1.6rem" }}
            >
              <StreakDetailsPanel data={data.userStreak} />
            </Popover>
          </>
        )}
      </PopupState>
    </motion.div>
  );
};
