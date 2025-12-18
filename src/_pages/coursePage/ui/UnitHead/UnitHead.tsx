import { Unit } from "@/entities/unit";
import { ArrowUpIcon, CheckCircleFilledIcon } from "@/shared/ui/icons";
import { alpha, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = Pick<Unit, "isFinished" | "name" | "id"> & {
  isActive?: boolean;
  isOpened?: boolean;
  toggleLessons?: () => void;
};

export const UnitHead: FC<Props> = ({
  isActive,
  isFinished,
  isOpened,
  name,
  toggleLessons,
}) => {
  return (
    <Stack
      alignItems={"center"}
      sx={(theme) => ({
        p: "1.5rem",
        backgroundColor: isActive
          ? alpha(theme.palette.emerald.main, .2)
          : theme.palette.common.white,
      })}
      direction={"row"}
      gap={"1.2rem"}
      onClick={toggleLessons}
    >
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <CheckCircleFilledIcon
              sx={{ fontSize: "2.4rem" }}
              color={"primary"}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, flexGrow: 1 }}>
        {name}
      </Typography>
      <motion.div
        variants={{
          open: { rotate: 0 },
          close: { rotate: 180 },
        }}
        animate={isOpened ? "open" : "close"}
        transition={{ ease: "easeInOut" }}
      >
        <IconButton color={"primary"}>
          <ArrowUpIcon sx={{ fontSize: "2.4rem" }} />
        </IconButton>
      </motion.div>
    </Stack>
  );
};
