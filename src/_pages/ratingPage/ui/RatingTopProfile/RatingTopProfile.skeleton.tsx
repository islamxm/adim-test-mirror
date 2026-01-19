import { FC } from "react";

import { Skeleton, Stack } from "@mui/material";

type Props = {
  isFirst?: boolean;
};
export const RatingTopProfileSkeleton: FC<Props> = ({ isFirst }) => {
  return (
    <Stack
      sx={{ transform: isFirst ? "translateY(-2rem)" : "translateY(0)", width: "24.3rem" }}
      gap={"1.2rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Skeleton
        variant={"circular"}
        width={isFirst ? "16.4rem" : "14.4rem"}
        height={isFirst ? "16.4rem" : "14.4rem"}
      />
      <Skeleton height={"3.3rem"} variant={"text"} width={"100%"} />
      <Skeleton height={"3.3rem"} width={"7rem"} />
    </Stack>
  );
};
