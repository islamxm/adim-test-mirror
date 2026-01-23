import { Skeleton, Stack } from "@mui/material";

export const QuestionResultSkeleton = () => {
  return (
    <Stack
      sx={{
        minHeight: "10.5rem",
        borderRadius: "1.8rem",
        border: "2px solid #ECECEC",
        p: "1.2rem 2rem",
      }}
      gap={"1.6rem"}
    >
      <Skeleton variant={"rounded"} height={"2.1rem"} />
      <Stack gap={"1rem"}>
        <Skeleton width={"30%"} variant={"rounded"} height={"2.4rem"} />
        <Skeleton width={"60%"} variant={"rounded"} height={"1.8rem"} />
      </Stack>
    </Stack>
  );
};
