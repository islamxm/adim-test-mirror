import { FC } from "react";

import { Chip, SvgIconProps } from "@mui/material";

import { BookIcon, GlobeIcon, MenuIcon } from "@/shared/ui/icons";

import { CourseCardChipInfo } from "../../model";

type Props = {
  type: CourseCardChipInfo;
  value?: string | number;
};

const iconProps: SvgIconProps = {
  sx: { fontSize: "1.6rem" },
};

export const InfoChip: FC<Props> = ({ type, value }) => {
  const icon = () => {
    switch (type) {
      case "category":
        return <MenuIcon {...iconProps} />;
      case "language":
        return <GlobeIcon {...iconProps} />;
      case "lessons_count":
        return <BookIcon {...iconProps} />;
    }
  };

  return (
    <Chip
      icon={icon()}
      color={"primary"}
      variant={"outlined"}
      label={value}
      sx={(theme) => ({
        borderColor: theme.palette.emerald.main,
        backgroundColor: theme.palette.emerald.light,
        fontSize: "1.4rem",
      })}
    />
  );
};
