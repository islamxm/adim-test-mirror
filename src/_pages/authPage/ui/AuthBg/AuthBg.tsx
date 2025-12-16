import { AuthType } from "@/entities/user";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";

type Props = {
  type: AuthType;
};

export const AuthBg: FC<Props> = ({ type }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.7,
      }}
    >
      <AnimatePresence>
        {type === "login" && (
          <>
            <Box
              sx={{ position: "absolute", top: 0, left: 0 }}
              component={motion.div}
              exit={{x: "-100%", y: "-100%"}}
            >
              <motion.svg
                width="464"
                height="473"
                viewBox="0 0 464 473"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: 0.1,
                      staggerChildren: 0.15,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="-30.3331"
                  cy="-37.4014"
                  r="250"
                  fill="#063B29"
                  variants={{
                    hidden: { scale: 0, rotate: -41.6684, opacity: 0 },
                    visible: { scale: 1, rotate: -41.6684, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="11.2181"
                  cy="9.28635"
                  rx="263"
                  ry="312.5"
                  fill="#063B29"
                  fillOpacity="0.65"
                  variants={{
                    hidden: { scale: 0, rotate: -41.6684, opacity: 0 },
                    visible: { scale: 1, rotate: -41.6684, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="35.484"
                  cy="36.552"
                  rx="263"
                  ry="349"
                  fill="#063B29"
                  fillOpacity="0.35"
                  variants={{
                    hidden: { scale: 0, rotate: -41.6684, opacity: 0 },
                    visible: { scale: 1, rotate: -41.6684, opacity: 1 },
                  }}
                />
              </motion.svg>
            </Box>

            <Box
              component={motion.div}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
              exit={{x: "100%", y: "100%"}}
            >
              <motion.svg
                width="436"
                height="446"
                viewBox="0 0 436 446"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.15,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="512.616"
                  cy="488.669"
                  r="250"
                  fill="#063B29"
                  variants={{
                    hidden: { scale: 0, rotate: 129.748, opacity: 0 },
                    visible: { scale: 1, rotate: 129.748, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="464.562"
                  cy="448.706"
                  rx="263"
                  ry="312.5"
                  transform="rotate(129.748 464.562 448.706)"
                  fill="#063B29"
                  fillOpacity="0.65"
                  variants={{
                    hidden: { scale: 0, rotate: 129.748, opacity: 0 },
                    visible: { scale: 1, rotate: 129.748, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="436.499"
                  cy="425.367"
                  rx="263"
                  ry="349"
                  transform="rotate(129.748 436.499 425.367)"
                  fill="#063B29"
                  fillOpacity="0.35"
                  variants={{
                    hidden: { scale: 0, rotate: 129.748, opacity: 0 },
                    visible: { scale: 1, rotate: 129.748, opacity: 1 },
                  }}
                />
              </motion.svg>
            </Box>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {type === "register" && (
          <>
            <Box
              sx={{ position: "absolute", top: 0, right: 0 }}
              component={motion.div}
              exit={{ y: "-100%", x: "100%" }}
            >
              <motion.svg
                width="464"
                height="473"
                viewBox="0 0 464 473"
                fill="none"
                style={{ transform: "scaleX(-1)" }}
                xmlns="http://www.w3.org/2000/svg"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: 0.1,
                      staggerChildren: 0.15,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="-30.3331"
                  cy="-37.4014"
                  r="250"
                  fill="#063B29"
                  variants={{
                    hidden: { scale: 0, rotate: -41.6684, opacity: 0 },
                    visible: { scale: 1, rotate: -41.6684, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="11.2181"
                  cy="9.28635"
                  rx="263"
                  ry="312.5"
                  fill="#063B29"
                  fillOpacity="0.65"
                  variants={{
                    hidden: { scale: 0, rotate: -41.6684, opacity: 0 },
                    visible: { scale: 1, rotate: -41.6684, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="35.484"
                  cy="36.552"
                  rx="263"
                  ry="349"
                  fill="#063B29"
                  fillOpacity="0.35"
                  variants={{
                    hidden: { scale: 0, rotate: -41.6684, opacity: 0 },
                    visible: { scale: 1, rotate: -41.6684, opacity: 1 },
                  }}
                />
              </motion.svg>
            </Box>
            <Box
              component={motion.div}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
              exit={{ y: "100%", x: "-100%" }}
            >
              <motion.svg
                width="436"
                height="446"
                viewBox="0 0 436 446"
                fill="none"
                style={{ transform: "scaleX(-1)" }}
                xmlns="http://www.w3.org/2000/svg"
                variants={{
                  visible: {
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.15,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="512.616"
                  cy="488.669"
                  r="250"
                  fill="#063B29"
                  variants={{
                    hidden: { scale: 0, rotate: 129.748, opacity: 0 },
                    visible: { scale: 1, rotate: 129.748, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="464.562"
                  cy="448.706"
                  rx="263"
                  ry="312.5"
                  transform="rotate(129.748 464.562 448.706)"
                  fill="#063B29"
                  fillOpacity="0.65"
                  variants={{
                    hidden: { scale: 0, rotate: 129.748, opacity: 0 },
                    visible: { scale: 1, rotate: 129.748, opacity: 1 },
                  }}
                />
                <motion.ellipse
                  cx="436.499"
                  cy="425.367"
                  rx="263"
                  ry="349"
                  transform="rotate(129.748 436.499 425.367)"
                  fill="#063B29"
                  fillOpacity="0.35"
                  variants={{
                    hidden: { scale: 0, rotate: 129.748, opacity: 0 },
                    visible: { scale: 1, rotate: 129.748, opacity: 1 },
                  }}
                />
              </motion.svg>
            </Box>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};
