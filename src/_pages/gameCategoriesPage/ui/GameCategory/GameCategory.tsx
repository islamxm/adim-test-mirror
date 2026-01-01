import { CompetitionCategory } from "@/entities/competition/model";
import { Box, Paper, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";
import Image from "next/image";
import { getGameCategoryPage, getGameMatchPage } from "@/shared/model";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import classes from './classes.module.scss';

type Props = CompetitionCategory & { parentId?: string };

export const GameCategory: FC<Props> = ({
  name,
  iconPath,
  subCategories,
  id,
  parentId,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const [bg, setBg] = useState<string>();

  useEffect(() => {
    if (imgRef.current && iconPath) {
      imgRef.current.onload = () => {
        const color = new ColorThief().getColor(imgRef.current);
        setBg(`rgba(${color}, .3)`);
      };
    }
  }, [imgRef, iconPath]);

  const onClick = () => {
    console.log(parentId)
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
        position: "relative",
        borderRadius: "2rem",
        cursor: "pointer",
        height: "20rem",
        p: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      })}
      className={classes.wrap}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      elevation={0}
    >
      <Typography
        variant="h3"
        sx={{ width: "60%", position: "relative", zIndex: 2 }}
      >
        {name}
      </Typography>
      {iconPath && (
        <Box component={"div"} className={classes.img}>
          <Image alt="" width={124} height={124} src={iconPath} />
        </Box>
      )}
    </Paper>
  );
};
