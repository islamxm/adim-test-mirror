"use client";
import { Container } from "@/shared/ui/Container";
import { Box, Button, Stack, Typography } from "@mui/material";
import classes from "./classes.module.scss";
import img from "./assets/promo-img.png";
import Image from "next/image";
import { ArrowRightIcon } from "@/shared/ui/icons";

export const PromoSection = () => {
  return (
    <Box
      sx={(theme) => ({
        py: "3.5rem",
        backgroundColor: theme.palette.common.white,
      })}
      className={classes.wrapper}
    >
      <Container>
        <div className={classes.body}>
          <div className={classes.bg}>
            <Image src={img} alt="" />
            <div className={classes.mask}></div>
          </div>
          <Box className={classes.content}>
            <Stack
              alignItems={"flex-start"}
              justifyContent={"center"}
              sx={(theme) => ({ color: theme.palette.common.white })}
              gap={"2.4rem"}
              className={classes.content_in}
            >
              <Typography sx={{fontSize: "5.4rem", textTransform: "uppercase"}} variant={"h2"}>Start <br/> learning now</Typography>
              <Typography variant={"subtitle1"}>
                Lorem ipsum felis pulvinar dignissim faucibus penatibus donec
                ultrices ligula. penatibus donec ultrices ligula.
              </Typography>
              <Button endIcon={<ArrowRightIcon />} variant={"contained"}>
                Start now
              </Button>
            </Stack>
          </Box>
        </div>
      </Container>
    </Box>
  );
};
