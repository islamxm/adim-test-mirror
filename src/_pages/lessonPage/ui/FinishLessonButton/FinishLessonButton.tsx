import { FC } from "react";

import { Button } from "@mui/material";

export type Props = {
  onFinishLesson?: (...args: any[]) => void;
};

export const FinishLessonButton: FC<Props> = ({ onFinishLesson }) => {
  return (
    <Button
      sx={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 100 }}
      color={"success"}
      variant={"contained"}
      disabled
    >
      Завершить урок
    </Button>
  );
};
