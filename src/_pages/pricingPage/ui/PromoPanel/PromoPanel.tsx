import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

import { ArrowRightIcon } from "@/shared/ui/icons";

import { PromoIcon } from "./PromoIcon";
import classes from "./classes.module.scss";

export const PromoPanel = () => {
  return (
    <Paper
      sx={{
        borderRadius: "1.6rem",
        p: "2.4rem",
      }}
    >
      <Grid container>
        <Grid size={6}>
          <Stack alignItems={"flex-start"} direction={"row"} gap={"1.6rem"} sx={{ pr: "1rem" }}>
            <Box>
              <PromoIcon />
            </Box>
            <Stack gap={".4rem"}>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: 400, lineHeight: "1.2em" }}>
                Активируйте промокод скидкой на 50% процентов или месяц бесплатно
              </Typography>
              <Typography sx={{ fontSize: "1.2rem", color: "#616161" }}>
                Вы можете приобрести карточку с промокодом в магазинах или в маркетах
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack gap={"1rem"} sx={{ pl: "1rem", borderLeft: "1px solid #DFDFDF" }}>
            <Stack gap={"1rem"} direction={"row"}>
              <Box
                sx={{
                  flexGrow: 1,
                  position: "relative",
                  padding: ".2rem",
                  borderRadius: "1.8rem",
                  overflow: "hidden",
                }}
              >
                <TextField
                  sx={{
                    position: "relative",
                    fontSize: "1.8rem",
                    zIndex: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  placeholder="Введите промокод"
                  fullWidth
                />
                <div className={classes.input_bg} />
              </Box>
              <Button variant={"contained"} sx={{ borderRadius: "1.6rem", minWidth: "unset" }}>
                <ArrowRightIcon sx={{ fontSize: "2rem" }} />
              </Button>
            </Stack>
            <Typography sx={{ fontSize: "1.2rem", color: "#616161" }}>
              Введите промокод здесь
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
