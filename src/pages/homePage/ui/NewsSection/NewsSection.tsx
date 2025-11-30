"use client";
import { Container } from "@/shared/ui/Container";
import { SectionHead } from "@/shared/ui/SectionHead";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import img from "./assets/slide-img-1.png";
import classes from "./classes.module.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";


export const NewsSection = () => {
  return (
    <Box
      className={classes.wrapper}
      sx={(theme) => ({
        backgroundColor: theme.palette.common.white,
      })}
    >
      <Container>
        <SectionHead
          title="platform News"
          subtitle="Lorem ipsum dolor sit amet consectetur. Facilisi sollicitudin tempus sit ac. Tellus ac cras in metus curabitur aliquet. "
        />
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${classes.slider_next_btn}`,
            prevEl: `.${classes.slider_prev_btn}`,
          }}
        >
          <SwiperSlide>
            <Box
              className={classes.slide}
              sx={{
                height: "55rem",
                position: "relative",
                p: "0 10rem",
              }}
            >
              <Box
                className={classes.img_wrapper}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  inset: 0,
                }}
              >
                <Image src={img} alt="" />
              </Box>
              <Box
                className={classes.content}
                sx={(theme) => ({
                  backgroundColor: theme.palette.common.white,
                  position: "relative",
                  borderRadius: "2rem",
                  p: "3.2rem",
                  maxWidth: "41.6rem",
                })}
              >
                <Stack gap={"2.4rem"}>
                  <Stack gap={".8rem"}>
                    <Typography
                      variant={"h3"}
                      sx={{
                        fontWeight: 400,
                        fontSize: "3.4rem",
                      }}
                    >
                      Start learning AI today and now
                    </Typography>
                    <Typography variant={"body1"}>
                      Lorem ipsum ipsum nec nisl libero tortor massa risus
                      tincidunt at scelerisque arcu at purus.
                    </Typography>
                  </Stack>
                  <Stack gap={"1.6rem"} direction={"row"}>
                    <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
                      Start now
                    </Button>
                    <Button variant={"outlined"}>Start now</Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              className={classes.slide}
              sx={{
                height: "55rem",
                position: "relative",
                p: "0 10rem",
              }}
            >
              <Box
                className={classes.img_wrapper}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  inset: 0,
                }}
              >
                <Image src={img} alt="" />
              </Box>
              <Box
                className={classes.content}
                sx={(theme) => ({
                  backgroundColor: theme.palette.common.white,
                  position: "relative",
                  borderRadius: "2rem",
                  p: "3.2rem",
                  maxWidth: "41.6rem",
                })}
              >
                <Stack gap={"2.4rem"}>
                  <Stack gap={".8rem"}>
                    <Typography
                      variant={"h3"}
                      sx={{
                        fontWeight: 400,
                        fontSize: "3.4rem",
                      }}
                    >
                      Start learning AI today and now
                    </Typography>
                    <Typography variant={"body1"}>
                      Lorem ipsum ipsum nec nisl libero tortor massa risus
                      tincidunt at scelerisque arcu at purus.
                    </Typography>
                  </Stack>
                  <Stack gap={"1.6rem"} direction={"row"}>
                    <Button variant={"contained"} endIcon={<ArrowRightIcon />}>
                      Start now
                    </Button>
                    <Button variant={"outlined"}>Start now</Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>

          <IconButton
            className={cn([classes.slider_prev_btn, classes.slider_btn])}
            sx={(theme) => ({
              backgroundColor: theme.palette.common.white,
              color: theme.palette.primary.main,
            })}
          >
            <ArrowLeftIcon sx={{width: "3.2rem", height: "3.2rem"}}/>
          </IconButton>
          <IconButton
            className={cn([classes.slider_next_btn, classes.slider_btn])}
            sx={(theme) => ({
              backgroundColor: theme.palette.common.white,
              color: theme.palette.primary.main,
            })}
          >
            <ArrowRightIcon sx={{width: "3.2rem", height: "3.2rem"}}/>
          </IconButton>
          <div className={classes.slider_next_btn}></div>
        </Swiper>
      </Container>
    </Box>
  );
};
