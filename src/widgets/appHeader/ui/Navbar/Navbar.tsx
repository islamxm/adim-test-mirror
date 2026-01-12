import { Paper, PaperOwnProps } from "@mui/material";
import { getHomePage, routesMap } from "@/shared/model";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { NavLink } from "../NavLink/NavLink";
import { FC, ReactNode } from "react";
import { Logo } from "@/shared/ui";
import { useTranslations } from "next-intl";

const routes = Object.entries(routesMap).map(([key, value]) => ({...value, key}));

type Props = {
  endSlot?: ReactNode;
  disableShadow?: boolean;
  disableNavigation?: boolean;
  sx?: PaperOwnProps["sx"];
};

export const Navbar: FC<Props> = ({
  endSlot,
  disableShadow,
  disableNavigation,
  sx,
}) => {
  const pathname = usePathname();
  const t = useTranslations("widgets.appHeader.Navbar.routes")

  return (
    <Paper
      sx={{
        borderRadius: "3rem",
        p: "0 .5rem",
        margin: "0 auto",
        height: "5.8rem",
        alignItems: "center",
        display: "flex",
        width: "100%",
        overflow: "hidden",
        gap: "3rem",
        ...sx,
      }}
      component={motion.div}
      layout="position"
      elevation={disableShadow ? 0 : 1}
      initial={{opacity: 0, scale: 0}}
      exit={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
    >
      {!disableNavigation &&
        routes.map((route) => (
          <motion.div style={{ overflow: "hidden" }} key={route.id} layout="position">
            {route.path === getHomePage() ? (
              <Logo sx={{ ml: "2.4rem" }} />
            ) : (
              <NavLink {...route} label={t(route.key)} isActive={pathname?.startsWith(route.path)} />
            )}
          </motion.div>
        ))}
      {endSlot}
    </Paper>
  );
};
