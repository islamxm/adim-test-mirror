import { FC, PropsWithChildren } from "react";

import { Stack, StackProps } from "@mui/material";
import { motion } from "motion/react";

type Props = PropsWithChildren<{
  side?: "left" | "right";
  alignItems?: StackProps["alignItems"];
  direction?: "row" | "column";
}>;

export const PlayerBadge: FC<Props> = ({
  children,
  side,
  direction = "column",
  alignItems = "center",
}) => {
  const sidePosition = () => {
    if (direction === "column") {
      return {
        left: 0,
        right: 0,
        top: "calc(100% + 1rem)",
      };
    }
    if (direction === "row") {
      if (side === "left") {
        return {
          left: "calc(100% + 1rem)",
        };
      }
      if (side === "right") {
        return {
          right: "calc(100% + 1rem)",
        };
      }
    }
  };

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      alignItems={alignItems}
      gap={"1.2rem"}
      sx={{
        position: "absolute",
        ...sidePosition(),
      }}
    >
      {children}
    </Stack>
  );
};
