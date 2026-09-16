import PageLayout from "@/components/PageLayout";
import Menu from "@/components/Menu";
import Breadcrumb from "@/components/Breadcrumb";

export default function MenuPage() {
  return (
    <PageLayout>
      <div className="h-24" />
      <Breadcrumb current="Menu" />
      <Menu />
    </PageLayout>
  );
}