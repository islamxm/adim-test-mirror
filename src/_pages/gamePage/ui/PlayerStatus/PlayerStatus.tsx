import { FC } from "react";

import { Box, Button, ButtonProps, alpha } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { NetworkErrorIcon } from "@/shared/ui/icons";

import { PlayerStatus as PlayerStatusType } from "../../model";

type Props = {
  status?: PlayerStatusType;
};

const getButtonProps = (
  status?: PlayerStatusType,
): Pick<ButtonProps, "color" | "children" | "sx" | "endIcon"> => {
  switch (status) {
    case "WAIT":
      return {
        color: "warning",
        sx: (theme) => ({
          backgroundColor: alpha("#FFE10066", 0.4),
          backdropFilter: "blur(2rem)",
          py: "1rem",
          minHeight: 0,
          borderRadius: "2.1rem",
          height: "3.6rem",
          boxShadow: "0 0 20px 5px #FFE10059",
          color: "#FFF080",
        }),
        children: "Waiting",
      };
    case "READY":
      return {
        color: "success",
        sx: (theme) => ({
          backgroundColor: alpha("#85FF8266", 0.4),
          backdropFilter: "blur(2rem)",
          py: "1rem",
          minHeight: 0,
          borderRadius: "2.1rem",
          height: "3.6rem",
          boxShadow: "0 0 20px 5px #09FF0259",
          color: "#0F600D",
        }),
        children: "Ready",
      };
    case "NETWORK_ERROR":
      return {
        color: "warning",
        sx: (theme) => ({
          backgroundColor: alpha("#FFE10066", 0.4),
          backdropFilter: "blur(2rem)",
          py: "1rem",
          minHeight: 0,
          borderRadius: "2.1rem",
          height: "3.6rem",
          boxShadow: "0 0 20px 5px #FFE10059",
          color: "#FFF080",
        }),
        children: "Waiting",
        endIcon: <NetworkErrorIcon />,
      };
    default:
      return {};
  }
};

export const PlayerStatus: FC<Props> = ({ status }) => {
  const buttonProps = getButtonProps(status);

  return (
    <Box height={"3.6rem"}>
      {status && (
        <Box component={motion.div} initial={{ translateY: "-100%" }} animate={{ translateY: 0 }}>
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
