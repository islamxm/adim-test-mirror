import { FC } from "react";

import { Button, Stack } from "@mui/material";
import { VideoQualityOptions } from "@vidstack/react";

import { CheckIcon } from "@/shared/ui/icons";

export const QualitiesContent: FC<{
  avilableQualities?: VideoQualityOptions;
  isAuto?: boolean;
}> = ({ avilableQualities, isAuto }) => {
  return (
    <Stack sx={{ width: "30rem" }} gap={".5rem"}>
      {avilableQualities?.map((quality, index) => {
        if (index === 0) {
          return (
            <Button
              key={index}
              sx={{ borderRadius: "1.4rem", justifyContent: "space-between" }}
              color={"secondary"}
              variant={"text"}
              onClick={() => quality.select()}
              endIcon={isAuto && <CheckIcon />}
            >
              Auto
            </Button>
          );
        }
        return (
          <Button
            key={index}
            sx={{ borderRadius: "1.4rem", justifyContent: "space-between" }}
            color={"secondary"}
            variant={"text"}
            onClick={() => quality.select()}
            endIcon={!isAuto && quality.quality?.selected && <CheckIcon />}
          >
            {quality.label}
          </Button>
        );
      })}
    </Stack>
  );
};
