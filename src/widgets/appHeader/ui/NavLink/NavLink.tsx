import { FC } from "react";

import Link from "next/link";

import { Box, Link as MuiLink } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { Route } from "@/shared/model";

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
      <Box sx={{ position: "relative" }} component={"span"}>
        <AnimatePresence>
          {isActive && (
            <Box
              component={motion.span}
              sx={(theme) => ({
                width: ".6rem",
                height: ".6rem",
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.light,
                position: "absolute",
                top: "calc(50% - (.6rem / 2))",
                left: 0,
              })}
              initial={{ x: 1, opacity: 0 }}
              exit={{ x: 1, opacity: 0 }}
              animate={{ x: "-1rem", opacity: 1 }}
            />
          )}
        </AnimatePresence>
        {label}
      </Box>
    </MuiLink>
  );
};
