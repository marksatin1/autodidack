import { getGalleryPhotos } from "@/app/lib/actions";
import Test from "@/app/ui/test";
import Gallery from "@/app/ui/gallery";
import CarouselTest from "@/app/ui/carousel-test";

export default async function Page({ params }: { params: { id: number } }) {
  const photos = await getGalleryPhotos(params.id);

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      {/* {photos && <Test photos={photos} />} */}
      {photos && <CarouselTest photos={photos} />}
      {/* {photos && <Gallery photos={photos} />} */}
    </div>
  );
}
