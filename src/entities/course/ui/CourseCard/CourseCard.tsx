import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import img from "../../../../../public/course-img.png";
import Link from "next/link";
import { MenuIconRound, PlayIconRound } from "@/shared/ui/icons";
import { FC } from "react";
import { Course } from "../../model";

export const CourseCard: FC<
  Pick<Course, "name" | "id" | "icon"> & Partial<Pick<Course, 'description'>>
> = ({ name, description }) => {
  return (
    <Paper
      sx={(theme) => ({
        height: "34.5rem",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        color: theme.palette.primary.main,
        flex: 1,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      })}
      elevation={0}
      component={Link}
      href={"#"}
    >
      <Box sx={{ height: "16.4rem" }}>
        <Image
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          src={img}
          alt=""
        />
      </Box>

      <Stack
        sx={{
          p: "1.6rem",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Stack gap={".8rem"}>
          <Typography variant="h4">{name}</Typography>
          <Typography
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant="body1"
          >
            {description}
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Button color="inherit" startIcon={<PlayIconRound />}>
            24
          </Button>
          <Button color="inherit" startIcon={<MenuIconRound />}>
            24
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
