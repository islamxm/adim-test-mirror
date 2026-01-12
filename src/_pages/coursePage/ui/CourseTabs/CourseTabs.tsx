"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Stack, Tab, Tabs } from "@mui/material";

import { BookIcon, ChatDoubleIcon } from "@/shared/ui/icons";

import { COURSE_TABS } from "@/entities/course";

export const CourseTabs = () => {
  const params = useSearchParams();
  const tabValue = params.get("tab") as keyof typeof COURSE_TABS;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs
      onChange={(_, v) => router.push(`${pathname}?${new URLSearchParams({ tab: v })}`)}
      value={tabValue}
    >
      <Tab
        value={COURSE_TABS.units}
        sx={{ flex: "0 0 50%" }}
        label={
          <Stack alignItems={"center"} gap={"1.2rem"} direction={"row"}>
            <BookIcon sx={{ fontSize: "2.4rem" }} />
            Units
          </Stack>
        }
      />
      <Tab
        value={COURSE_TABS.comments}
        sx={{ flex: "0 0 50%" }}
        label={
          <Stack alignItems={"center"} gap={"1.2rem"} direction={"row"}>
            <ChatDoubleIcon sx={{ fontSize: "2.4rem" }} />
            Comments
          </Stack>
        }
      />
    </Tabs>
  );
};
