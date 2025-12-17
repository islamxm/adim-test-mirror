import { Language, languagesMap } from "@/shared/model";
import { GlobeIcon } from "@/shared/ui/icons";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  languages: Array<Language>;
};

export const CourseLanguagesBadge: FC<Props> = ({ languages }) => {
  return (
    <Stack gap={"1.2rem"} direction={"row"} alignItems={"flex-start"}>
      <GlobeIcon sx={theme => ({ fontSize: "2.4rem", verticalAlign: "top", color: theme.palette.text.disabled })} />
      <Typography
        sx={(theme) => ({
          fontSize: "1.8rem",
          color: theme.palette.text.disabled,
        })}
      >
        {languages.map((lang) => languagesMap[lang].label).join(", ")}
      </Typography>
    </Stack>
  );
};
