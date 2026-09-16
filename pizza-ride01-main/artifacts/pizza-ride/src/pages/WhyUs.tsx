import PageLayout from "@/components/PageLayout";
import Features from "@/components/Features";
import Breadcrumb from "@/components/Breadcrumb";

export default function WhyUs() {
  return (
    <PageLayout>
      <div className="h-24" />
      <Breadcrumb current="Why Us" />
      <Features />
    </PageLayout>
  );
}