import { getGalleryPhotos } from "@/app/lib/actions";
import Gallery from "@/app/ui/gallery";

export default async function Page({ params }: { params: { id: number } }) {
  const photos = await getGalleryPhotos(params.id);

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      {photos && <Gallery photos={photos} />}
    </div>
  );
}
