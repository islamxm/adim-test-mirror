import { alpha, Stack, Typography } from "@mui/material";
import img from "../../../../../public/error-img.png";
import Image from "next/image";
import { motion } from "motion/react";

export const OfflineScreen = () => {
  return (
    <Stack
      sx={{
        position: "fixed",
        inset: 0,
        backdropFilter: "blur(5px)",
        backgroundColor: alpha("#fff", 0.3),
        zIndex: 3,
      }}
      justifyContent={"center"}
      alignItems={"center"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Stack
        component={motion.div}
        gap={"2rem"}
        justifyContent={"center"}
        alignItems={"center"}
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          scale: {
            times: [0,.5,1],
            ease: "easeInOut",
            duration: 1,
            repeat: Infinity
          },
        }}
      >
        <Image
          src={img}
          alt="Error"
          width={250}
          height={250}
          objectFit="contain"
          priority
        />
        <Typography variant="h3">Network error</Typography>
      </Stack>
    </Stack>
  );
};
