import { Question } from "@/entities/competition";
import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = Omit<Question["choices"][0], "key"> & {
  variant: string;
  isActive?: boolean;
  onChange?: () => void;
};

export const Variant: FC<Props> = ({ variant, value, isActive, onChange }) => {
  return (
    <Button
      sx={(theme) => ({
        minHeight: "14.2rem",
        p: "2.5rem",
        color: isActive
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
        backgroundColor: isActive
          ? theme.palette.primary.main
          : theme.palette.common.white,
      })}
      onClick={onChange}
    >
      <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
        {/* <Typography
        sx={{
          fontSize: "1.8rem",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {variant}{")"}
      </Typography> */}
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {value}
        </Typography>
      </Stack>
    </Button>
  );
};
