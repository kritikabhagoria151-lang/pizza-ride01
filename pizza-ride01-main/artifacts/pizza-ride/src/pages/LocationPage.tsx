import PageLayout from "@/components/PageLayout";
import LocationContact from "@/components/LocationContact";
import Breadcrumb from "@/components/Breadcrumb";

export default function LocationPage() {
  return (
    <PageLayout>
      <div className="h-24" />
      <Breadcrumb current="Location" />
      <LocationContact />
    </PageLayout>
  );
}