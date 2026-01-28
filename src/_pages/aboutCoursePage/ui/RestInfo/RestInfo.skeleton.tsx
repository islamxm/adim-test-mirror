import { Box, Skeleton, Stack } from "@mui/material";

export const RestInfoSkeleton = () => {
  return (
    <Box sx={{ width: "100%", p: "4rem 1rem 0 0" }}>
      <Stack gap={"2rem"}>
        <Skeleton variant={"rounded"} height={"30rem"} />
        <Stack gap={".5rem"}>
          <Skeleton variant={"rounded"} height={"2rem"} />
          <Skeleton variant={"rounded"} height={"2rem"} />
          <Skeleton variant={"rounded"} height={"2rem"} />
          <Skeleton variant={"rounded"} height={"2rem"} />
          <Skeleton width={"30%"} variant={"rounded"} height={"2rem"} />
        </Stack>
      </Stack>
    </Box>
  );
};
