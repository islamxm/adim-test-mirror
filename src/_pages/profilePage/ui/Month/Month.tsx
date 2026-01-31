import { Box, Stack, Typography, alpha } from "@mui/material";
import dayjs from "dayjs";

import { CalendarIcon } from "@/shared/ui/icons";

import { userApi } from "@/entities/user";

import { MonthDay } from "./MonthDay";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function isDone(mask: number, day: number): boolean {
  return (mask & (1 << (day - 1))) !== 0;
}

export const Month = () => {
  const { data } = userApi.useGetMonthlyStreakQuery({});
  const currentDate = dayjs();
  const daysInMonth = currentDate.daysInMonth();

  const startDay = currentDate.startOf("month").day();
  const emptySlots = startDay === 0 ? 6 : startDay - 1;
  const blanks = Array(emptySlots).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Stack sx={{ p: "2.4rem 3.2rem" }} gap={"2.6rem"} direction={"row"}>
      <Stack
        sx={{
          width: "5.4rem",
          height: "5.4rem",
          flex: "0 0 auto",
          borderRadius: "50%",
          backgroundColor: alpha("#FFAC7826", 0.15),
          flexShrink: 0,
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CalendarIcon sx={{ fontSize: "2.3rem", color: "#FFAC78" }} />
      </Stack>
      <Stack gap={".8rem"}>
        <Typography sx={{ fontWeight: 600 }}>Месячные дни подряд</Typography>
        <Box
          sx={{
            display: "grid",
            gap: "1.2rem",
            gridTemplateColumns: "2.8rem 2.8rem 2.8rem 2.8rem 2.8rem 2.8rem 2.8rem",
            gridTemplateRows: "2.8rem 2.8rem 2.8rem 2.8rem 2.8rem 2.8rem",
            width: "100%",
          }}
        >
          {weekdays.map((weekday) => (
            <Box key={weekday}>{weekday}</Box>
          ))}
          {blanks.map((_, index) => (
            <Box key={`blank-${index}`} />
          ))}
          {days.map((day) => (
            <MonthDay isActive={isDone(data?.mask || 0, day)} key={day} />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
