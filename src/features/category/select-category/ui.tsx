"use client";
import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { Tab, Tabs } from "@mui/material";
import { motion } from "motion/react";

import { categoryApi } from "@/entities/category";

export const CategoryTabs = () => {
  const router = useRouter();
  const params = useParams<{ category: string }>();
  const { data, isError } = categoryApi.useGetCategoriesQuery(undefined);

  useEffect(() => {
    if (data?.categories && !params?.category) {
      router.push(`/courses/${data.categories[0].id}`);
    }
  }, [data, params, router]);

  if (isError || !data) {
    return null;
  }

  const handleChange = (_: any, value: any) => {
    router.push(`/courses/${value}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Tabs
        variant="scrollable"
        scrollButtons={false}
        value={!isNaN(Number(params?.category)) && Number(params?.category)}
        onChange={handleChange}
        sx={(theme) => ({
          "& .MuiTabs-indicator": {
            // height: ".3rem",
            height: "100%",
            backgroundColor: theme.palette.background.default,
            borderRadius: "1.5rem 1.5rem 0 0",
          },
          "& .MuiTabs-list": {
            // gap: "2.4rem",
          },
          "& .MuiTab-root": {
            zIndex: 2,
            p: "1.6rem 3.7rem",
          },
        })}
      >
        {data.categories.map((category) => (
          <Tab
            sx={(theme) => ({
              fontSize: "2.4rem",
              fontWeight: 600,
              color: theme.palette.text.disabled,
              borderRadius: "2rem 2rem 0 0",
              "& .Mui-selected": {
                color: theme.palette.primary.main,
              },
            })}
            label={category.name}
            value={category.id}
            key={category.id}
          />
        ))}
      </Tabs>
    </motion.div>
  );
};
