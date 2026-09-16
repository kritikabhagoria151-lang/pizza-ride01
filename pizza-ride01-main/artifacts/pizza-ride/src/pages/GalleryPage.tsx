import PageLayout from "@/components/PageLayout";
import Gallery from "@/components/Gallery";
import Breadcrumb from "@/components/Breadcrumb";

export default function GalleryPage() {
  return (
    <PageLayout>
      <div className="h-24" />
      <Breadcrumb current="Gallery" />
      <Gallery />
    </PageLayout>
  );
}