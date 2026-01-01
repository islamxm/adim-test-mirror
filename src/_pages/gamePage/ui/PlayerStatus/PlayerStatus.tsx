import { alpha, Box, Button, ButtonProps } from "@mui/material";
import { PlayerStatus as PlayerStatusType } from "../../model";
import { FC } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  status?: PlayerStatusType;
};

const getButtonProps = (
  status?: PlayerStatusType
): Pick<ButtonProps, "color" | "children" | "sx"> => {
  switch (status) {
    case "WAIT":
      return {
        color: "warning",
        sx: (theme) => ({
          backgroundColor: alpha(theme.palette.gold.main, 0.3),
          backdropFilter: "blur(2rem)",
          py: "1rem",
          minHeight: 0,
          borderRadius: "2.1rem",
          height: "3.6rem",
        }),
        children: "Waiting",
      };
    case "READY":
      return {
        color: "success",
        sx: (theme) => ({
          backgroundColor: alpha(theme.palette.success.main, 0.3),
          backdropFilter: "blur(2rem)",
          py: "1rem",
          minHeight: 0,
          borderRadius: "2.1rem",
          height: "3.6rem",
        }),
        children: "Ready",
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
        <Box
          component={motion.div}
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
