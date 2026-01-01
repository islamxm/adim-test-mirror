import { motion } from "motion/react";
import v from "../../assets/v.png";
import s from "../../assets/s.png";
import flash from "../../assets/flash.png";
import { Box, Stack } from "@mui/material";
import { Shine } from "./Shine";
import { Light } from "./Light";
import { FC } from "react";

type Props = {
  disableAnimation?: boolean;
};

export const Versus: FC<Props> = ({ disableAnimation }) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ position: "relative", width: "20rem", height: "20rem" }}
    >
      <Light />
      {!disableAnimation && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          sx={{ position: "absolute", inset: 0, scale: 2 }}
        >
          <Shine />
        </Box>
      )}
      <Stack
        sx={{ position: "relative", zIndex: 2 }}
        direction={"row"}
        alignItems={"center"}
      >
        <motion.img
          initial={{ x: -100, opacity: 0, y: -20 }}
          animate={{ x: 0, opacity: 1, y: -20 }}
          transition={{ ease: [0.29, 0.58, 0.21, 0.99], duration: 0.5 }}
          src={v.src}
          alt=""
          width={48}
          height={48}
        />
        <motion.img
          src={flash.src}
          alt=""
          initial={{ scale: disableAnimation ? 1 : 15, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.8,
            bounce: 0.3,
            delay: 0.5,
          }}
          width={53}
          height={78}
        />
        <motion.img
          initial={{ x: 100, opacity: 0, y: 20 }}
          animate={{ x: 0, opacity: 1, y: 20 }}
          transition={{ ease: [0.29, 0.58, 0.21, 0.99], duration: 0.5 }}
          src={s.src}
          width={48}
          height={48}
          alt=""
        />
      </Stack>
    </Stack>
  );
};
