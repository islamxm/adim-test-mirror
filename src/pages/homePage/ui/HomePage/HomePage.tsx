"use client";
import { Stack } from "@mui/material"
import { HeroSection } from "../HeroSection/HeroSection"
import { CategoriesSection } from "../CategoriesSection/CategoriesSection"
import { NewsSection } from "../NewsSection/NewsSection"
import { CoursesSection } from "../CoursesSection/CoursesSection"
import { PromoSection } from "../PromoSection/PromoSection"
import { FC } from "react";
import { HomePagePublicDataResponse } from "../../model";

type Props = {
  data: HomePagePublicDataResponse['success']
}

export const HomePage:FC<Props> = ({data}) => {
  
  return (
    <Stack>
      <HeroSection/>
      <CategoriesSection data={data.categories}/>
      <NewsSection/>
      <CoursesSection data={data.popularCourses}/>
      <PromoSection/>
    </Stack>
  )
}