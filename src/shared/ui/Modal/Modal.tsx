import { FC } from "react";

import {
  Box,
  Grow,
  IconButton,
  Modal as MuiModal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { ModalProps } from "@/shared/types";

import { CloseThinIcon } from "../icons";

export const Modal: FC<ModalProps> = ({
  children,
  title,
  contentStyle,
  wrapperStyle,
  hideCloseButton,
  beforeTitleSlot,
  ...props
}) => {
  const theme = useTheme();

  return (
    <MuiModal
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        minHeight: "100vh",
      }}
      closeAfterTransition
    >
      <Grow in={props.open}>
        <Box
          sx={{
            border: "none",
            borderRadius: "4.4rem",
            outline: "none",
            backgroundColor: theme.palette.background.paper,
            alignSelf: "center",
            my: 4,
            width: "100%",
            overflow: "hidden",
            position: "relative",
            ...wrapperStyle,
          }}
        >
          <Stack
            sx={{ height: "8rem", position: "relative", p: "1rem 3rem" }}
            gap={"1rem"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <AnimatePresence>{beforeTitleSlot}</AnimatePresence>
              <Typography
                component={motion.p}
                layout={"position"}
                sx={{ fontSize: "2.2rem", fontWeight: 600, pr: "5rem" }}
                noWrap
              >
                {title}
              </Typography>
            </Stack>
            {!hideCloseButton && (
              <IconButton
                color={"default"}
                sx={{
                  width: "4rem",
                  height: "4rem",
                  position: "absolute",
                  top: "2rem",
                  right: "3rem",
                }}
                onClick={props?.onClose}
                component={motion.button}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CloseThinIcon sx={{ fontSize: "2.4rem", color: "#000" }} />
              </IconButton>
            )}
          </Stack>
          <Box
            sx={{
              p: "2.4rem 4.4rem",
              width: "100%",
              ...contentStyle,
            }}
          >
            {children}
          </Box>
        </Box>
      </Grow>
    </MuiModal>
  );
};
