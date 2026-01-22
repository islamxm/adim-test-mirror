import { FC } from "react";

import { Box, Button, ButtonProps, alpha } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { NetworkErrorIcon } from "@/shared/ui/icons";

import { PlayerStatusType } from "../../model";

type Props = {
  status?: PlayerStatusType;
};

const defaultButtonProps: ButtonProps = {
  sx: {
    backdropFilter: "blur(2rem)",
    py: "1rem",
    minHeight: 0,
    borderRadius: "2.1rem",
    height: "100%",
  },
};

const getButtonProps = (
  status?: PlayerStatusType,
): Pick<ButtonProps, "color" | "children" | "sx" | "endIcon"> => {
  switch (status) {
    case "WAIT":
      return {
        ...defaultButtonProps,
        color: "warning",
        sx: {
          ...defaultButtonProps.sx,
          backgroundColor: alpha("#FFE10066", 0.4),
          boxShadow: "0 0 10px 5px #FFE10059",
          color: "#FFF080",
        },
        children: "Waiting",
      };
    case "READY":
      return {
        ...defaultButtonProps,
        color: "success",
        sx: {
          ...defaultButtonProps.sx,
          backgroundColor: alpha("#85FF8266", 0.4),
          boxShadow: "0 0 10px 5px #09FF0259",
          color: "#0F600D",
        },
        children: "Ready",
      };
    case "NETWORK_ERROR":
      return {
        ...defaultButtonProps,
        color: "warning",
        sx: {
          ...defaultButtonProps.sx,
          backgroundColor: alpha("#FFE10066", 0.4),
          boxShadow: "0 0 10px 5px #FFE10059",
          color: "#FFF080",
        },
        children: "Waiting",
        endIcon: <NetworkErrorIcon />,
      };
    case "LOSE":
      return {
        ...defaultButtonProps,
        sx: {
          ...defaultButtonProps.sx,
          backgroundColor: alpha("#FFE10066", 0.35),
          boxShadow: "0 0 10px 5px #FFE10066",
          color: "#FFF080",
          border: "1px solid #FFF080",
        },
        children: "Lose",
      };
    case "WIN":
      return {
        ...defaultButtonProps,
        sx: {
          ...defaultButtonProps.sx,
          backgroundColor: alpha("#85FF8266", 0.4),
          boxShadow: "0 0 10px 5px #85FF8266",
          color: "#0F600D",
          border: "1px solid #0F600D",
        },
        children: "Win",
      };
    case "DRAW":
      return {
        ...defaultButtonProps,
        sx: {
          ...defaultButtonProps.sx,
          backgroundColor: alpha("#85FF8266", 0.4),
          boxShadow: "0 0 10px 5px #85FF8266",
          color: "#0F600D",
          border: "1px solid #0F600D",
        },
        children: "Draw",
      };
    default:
      return {};
  }
};

export const PlayerStatus: FC<Props> = ({ status }) => {
  const buttonProps = getButtonProps(status);

  return (
    <Box height={"4.2rem"}>
      {status && (
        <Box
          component={motion.div}
          sx={{ height: "100%" }}
          initial={{ translateY: "-100%" }}
          animate={{ translateY: 0 }}
        >
          <Button {...buttonProps} variant={"text"}>
            <AnimatePresence mode="wait">
              <motion.span
                style={{ display: "inline-block" }}
                key={status}
                initial={{ y: "-100%", opacity: 0 }}
                exit={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                {buttonProps.children}
              </motion.span>
            </AnimatePresence>
          </Button>
        </Box>
      )}
    </Box>
  );
};
