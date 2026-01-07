import { Box, Skeleton, Stack } from "@mui/material";
import { motion } from "motion/react";

export const CommentSkeleton = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        p: "1.6rem",
        width: "100%",
        minHeight: "15.6rem"
      }}
    >
      <Stack gap={"1.3rem"}>
        <Stack direction={"row"} alignItems={"flex-start"} gap={"1.2rem"}>
          <Skeleton
            variant={"circular"}
            sx={{ flex: "0 0 auto" }}
            width={"3.8rem"}
            height={"3.8rem"}
          />
          <Stack gap={".4rem"} sx={{ width: "100%" }}>
            <Skeleton variant={"text"} height={"2.5rem"} width={"50%"} />
            <Skeleton variant={"text"} height={"1.8rem"} width={"70%"} />
          </Stack>
        </Stack>
        <Skeleton variant={"text"} height={"4rem"} width={"100%"} />
      </Stack>
    </Box>
  );
};
