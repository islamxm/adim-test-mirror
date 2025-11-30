import { Logo } from "@/shared/ui/Logo";
import { Paper, Link as MuiLink, Stack } from "@mui/material";
import Link from "next/link";
import { Avatar } from "@/entities/user";

const routes = ["Courses", "Points", "Rating"];

export const Navbar = () => {
  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
        borderRadius: "3rem",
        p: "0 .5rem",
        margin: "0 auto",
        height: "5.8rem",
        alignItems: "center",
        display: "flex",
      })}
    >
      <Stack direction={"row"} alignItems={"center"} gap={"3rem"}>
        <Logo sx={{ml: "2.4rem"}}/>
        {routes.map((route) => (
          <MuiLink
            key={route}
            component={Link}
            href={route}
            sx={(theme) => ({
              padding: "0.6rem 2.5rem",
              fontWeight: 600,
              fontSize: "1.8rem",
              color: theme.palette.primary.dark,
              "&:hover": {
                color: theme.palette.primary.light
              }
            })}
          >
            {route}
          </MuiLink>
        ))}
        <Avatar
          size="4.8rem"
          />
      </Stack>
    </Paper>
  );
};
