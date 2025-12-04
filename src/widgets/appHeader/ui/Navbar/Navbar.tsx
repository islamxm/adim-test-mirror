import { Logo } from "@/shared/ui/Logo";
import { Paper, Stack } from "@mui/material";
import { UserAvatar } from "@/features/user/user-avatar";
import { getHomePage, routesMap } from "@/shared/model";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { NavLink } from "../NavLink/NavLink";

const routes = Object.entries(routesMap)
  .map((route) => route[1])
  .filter((route) => route.path !== getHomePage());

export const Navbar = () => {
  const pathname = usePathname()

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
      component={motion.div}
      layout
      initial={{scale: 0, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
    >
      <Stack direction={"row"} alignItems={"center"} gap={"3rem"} component={motion.div} layout>
        <Logo sx={{ ml: "2.4rem" }} />
        {routes.map((route) => (
          <motion.div key={route.id} layout>
            <NavLink
              {...route}
              isActive={pathname?.startsWith(route.path)}
              />
          </motion.div>
        ))}
        <UserAvatar />
      </Stack>
    </Paper>
  );
};
