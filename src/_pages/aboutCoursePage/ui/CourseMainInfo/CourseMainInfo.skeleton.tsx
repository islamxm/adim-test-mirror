import { Box, Skeleton, Stack } from "@mui/material";

import { Container } from "@/shared/ui";

export const CourseMainInfoSkeleton = () => {
  return (
    <Box sx={{ minHeight: "28rem" }}>
      <Container>
        <Stack gap={"4.4rem"} sx={{ maxWidth: "calc(100% - 46.7rem)" }}>
          <Skeleton width={"50%"} height={"4rem"} variant={"rounded"} />
          <Stack gap={"1rem"}>
            <Skeleton width={"70%"} variant={"rounded"} />
            <Skeleton width={"80%"} variant={"rounded"} />
            <Skeleton width={"40%"} variant={"rounded"} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
