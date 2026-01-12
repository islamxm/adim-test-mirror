import { FC } from "react";

import { Paper, Stack } from "@mui/material";
import { motion } from "motion/react";

import { PointFilledIcon } from "@/shared/ui/icons";

type Props = {
  value?: number;
};

export const PointsBadge: FC<Props> = ({ value }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "1.2rem",
        p: "0.7rem 1rem",
        fontSize: "1.6rem",
        fontWeight: 600,
        height: "3.8rem",
      }}
    >
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        direction={"row"}
        gap={"1rem"}
        alignItems={"center"}
      >
        <PointFilledIcon
          sx={(theme) => ({
            color: theme.palette.gold.main,
            fontSize: "2rem",
          })}
        />
        {value}
      </Stack>
    </Paper>
  );
};
