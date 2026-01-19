import { FC } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { getGameCategoryPage, getGameMatchPage } from "@/shared/model";

import { CompetitionCategory } from "@/entities/competition/model";

type Props = CompetitionCategory & { parentId?: string };

export const GameCategory: FC<Props> = ({ name, iconPath, subCategories, id, parentId }) => {
  const router = useRouter();

  const onClick = () => {
    if (subCategories && subCategories.length > 0) {
      router.push(getGameCategoryPage(id));
    } else {
      if (parentId) {
        router.push(getGameMatchPage(Number(parentId), id));
      }
    }
  };

  return (
    <Paper
      sx={(theme) => ({
        display: "block",
        height: "250px",
        borderRadius: "3.4rem",
        p: "3.4rem",
        color: theme.palette.primary.main,
        cursor: "pointer",
        flexGrow: 1,
      })}
      component={motion.div}
      elevation={0}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{
        scale: 1.05,
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <Stack gap={"4rem"}>
        <Box
          sx={{
            width: "8.6rem",
            height: "8.6rem",
            overflow: "hidden",
            borderRadius: "1.4rem",
            border: "1px solid #C7C2FB",
          }}
        >
          {iconPath && <Image src={iconPath} alt="" width={86} height={86} />}
        </Box>
        <Typography
          variant={"h2"}
          sx={{ fontSize: "2.6rem", color: "#3D3D3D" }}
          textTransform={"uppercase"}
        >
          {name}
        </Typography>
      </Stack>
    </Paper>
  );
};
