import { createStore } from "@/_app/providers/store";

import { HomePage as HomePageComponent } from "@/_pages/homePage";
import { homePageApi } from "@/_pages/homePage";
import { PublicHomePageData } from "@/_pages/homePage/model";

export default async function HomePage() {
  const store = createStore();
  await store.dispatch(homePageApi.endpoints.getHomePublicData.initiate(undefined));

  const data =
    (homePageApi.endpoints.getHomePublicData.select(undefined)(store.getState())
      .data as PublicHomePageData) ??
    ({
      categories: [],
      popularCourses: [],
      promotion: undefined,
    } as PublicHomePageData);

  return <HomePageComponent data={data} />;
}
