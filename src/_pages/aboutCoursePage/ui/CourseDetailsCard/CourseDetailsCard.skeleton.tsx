import { Paper, Skeleton, Stack } from "@mui/material";

export const CourseDetailsCardSkeleton = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "46.7rem",
        p: "2.4rem",
        height: "73.9rem",
        borderRadius: "1.8rem",
      }}
    >
      <Stack gap={"1.6rem"}>
        <Skeleton variant={"rounded"} height={"28rem"} />
        <Skeleton sx={{ borderRadius: "1.8rem" }} variant={"rounded"} height={"5.2rem"} />
        <Stack gap={"1.6rem"}>
          <Skeleton variant={"rounded"} width={"50%"} height={"2.7rem"} />
          <Skeleton variant={"rounded"} width={"60%"} height={"2.7rem"} />
          <Skeleton variant={"rounded"} width={"40%"} height={"2.7rem"} />
        </Stack>
      </Stack>
    </Paper>
  );
};
