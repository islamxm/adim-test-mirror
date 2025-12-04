import Link from "next/link";
import { Box, Link as MuiLink } from "@mui/material";
import { Route } from "@/shared/model";
import { FC } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = Route & { isActive?: boolean };

export const NavLink: FC<Props> = ({ path, label, isActive }) => {
  return (
    <MuiLink
      component={Link}
      href={path}
      sx={(theme) => ({
        padding: "0.6rem 2.5rem",
        fontWeight: 600,
        fontSize: "1.8rem",
        color: isActive ? theme.palette.primary.light : theme.palette.primary.dark,
        alignItems: "center",
        display: "flex",
        gap: ".6rem",
        "&:hover": {
          color: theme.palette.primary.light,
        },
      })}
    >
      <AnimatePresence>
        {isActive && (
          <Box
            component={motion.span}
            sx={(theme) => ({
              width: ".6rem",
              height: ".6rem",
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.light,
            })}
            initial={{ x: 1, opacity: 0 }}
            exit={{ x: 1, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          />
        )}
      </AnimatePresence>
      {label}
    </MuiLink>
  );
};
