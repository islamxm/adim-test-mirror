import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import img from "../../../../../public/tl-2.png";
import { Container } from "@/shared/ui/Container";
import classes from "./classes.module.scss";
import { cn } from "@/shared/lib/cn";

export const HeroSection = () => {
  return (
    <Container>
      <Stack
        className={classes.wrapper}
        sx={{ height: "100vh" }}
        direction={"row"}
        gap={"3rem"}
        alignItems={"center"}
      >
        {/* bg */}
        <div className={cn([classes.bg, classes.bg_top])}>
          <svg
            width="526"
            height="262"
            viewBox="0 0 526 262"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="263"
              cy="-123.5"
              rx="263"
              ry="312.5"
              fill="#063B29"
              fillOpacity="0.65"
            />
            <ellipse
              cx="263"
              cy="-87"
              rx="263"
              ry="349"
              fill="#063B29"
              fillOpacity="0.35"
            />
            <circle cx="263" cy="-186" r="250" fill="#063B29" />
          </svg>
        </div>
        <div className={cn([classes.bg, classes.bg_bottom])}>
          <svg
            width="526"
            height="261"
            viewBox="0 0 526 261"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="263"
              cy="385.5"
              rx="263"
              ry="312.5"
              transform="rotate(180 263 385.5)"
              fill="#063B29"
              fillOpacity="0.65"
            />
            <ellipse
              cx="263"
              cy="349"
              rx="263"
              ry="349"
              transform="rotate(180 263 349)"
              fill="#063B29"
              fillOpacity="0.35"
            />
            <circle
              cx="263"
              cy="448"
              r="250"
              transform="rotate(180 263 448)"
              fill="#063B29"
            />
          </svg>
        </div>
        {/* bg */}
        <Typography sx={{ textTransform: "uppercase", flexGrow: 1, flexShrink: 1, flexBasis: 0, fontSize: "5.4rem", lineHeight: "8.4rem" }} variant="h1">
          getway to your knowledge universe
        </Typography>
        <Box sx={{flexGrow: 0, flexBasis: "41.9rem"}}>
          <Image  src={img} alt="test" width={419} height={419} />
        </Box>
        <Typography sx={{flexGrow: 1, flexShrink: 1, flexBasis: 0, fontWeight: 600}} variant={"subtitle1"}>
          Lorem ipsum dolor sit amet consectetur. Maecenas ac augue felis massa.
          Cras felis massa. Cras felis massa. Cras Cras felis massa
        </Typography>
      </Stack>
    </Container>
  );
};
