import { AppFooter } from "@/widgets/appFooter";
import { AppHeader } from "@/widgets/appHeader";
import { MainLayout } from "@/widgets/mainLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout header={<AppHeader />} footer={<AppFooter />}>
      {children}
    </MainLayout>
  );
}
