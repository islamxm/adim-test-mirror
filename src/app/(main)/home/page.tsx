import { createStore } from "@/_app/providers/store";
import { HomePage as HomePageComponent, HomePagePublicDataResponse } from "@/_pages/homePage";
import { homePageApi } from "@/_pages/homePage";

export default async function HomePage() {
  const store = createStore();
  await store.dispatch(homePageApi.endpoints.getHomePublicData.initiate(undefined))
  
  const data = homePageApi.endpoints.getHomePublicData.select(undefined)(store.getState()).data as HomePagePublicDataResponse['success'] ?? {categories: [], popularCourses: [], promotion: undefined} as HomePagePublicDataResponse['success']

  return <HomePageComponent data={data}/>;
}
