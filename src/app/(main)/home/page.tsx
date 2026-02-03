import { createStore } from "@/_app/providers/store";

import { HomePage, PublicHomePageData, homePageApi } from "@/_pages/homePage";

export default async function Page() {
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

  return <HomePage data={data} />;
}
