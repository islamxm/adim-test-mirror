"use client";
import { Stack } from "@mui/material"
import { HeroSection } from "../HeroSection/HeroSection"
import { CategoriesSection } from "../CategoriesSection/CategoriesSection"
import { NewsSection } from "../NewsSection/NewsSection"
import { CoursesSection } from "../CoursesSection/CoursesSection"
import { PromoSection } from "../PromoSection/PromoSection"

export const HomePage = () => {

  return (
    <Stack>
      <HeroSection/>
      <CategoriesSection/>
      <NewsSection/>
      <CoursesSection/>
      <PromoSection/>
    </Stack>
  )
}