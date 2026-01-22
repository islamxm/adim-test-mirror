import { forwardRef } from "react";

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { YellowSpinner } from "@/shared/ui";

export const ResourceListLoading = forwardRef<HTMLDivElement, any>((_, ref) => {
  return (
    <Stack
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ p: "1rem", width: "100%" }}
    >
      <YellowSpinner />
    </Stack>
  );
});

ResourceListLoading.displayName = "ResourceListLoading";
