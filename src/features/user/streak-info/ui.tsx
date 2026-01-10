import { StreakPanel, StreakDetailsPanel, userApi } from "@/entities/user";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Box, Popover } from "@mui/material";
import { motion } from "motion/react";

export const StreakInfo = () => {
  const { data, isError } = userApi.useGetHomeUserDataQuery(undefined);

  if (isError || !data) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{opacity: 0, scale: 0}}
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
              sx={{mt: "1.6rem"}}
            >
              <StreakDetailsPanel data={data.userStreak} />
            </Popover>
          </>
        )}
      </PopupState>
    </motion.div>
  );
};
