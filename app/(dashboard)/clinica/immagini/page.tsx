import { deleteImage, getImageByIdPiano } from "@/actions/actions.clinica";
import { redirect } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import UploadWidget from "@/components/dashboard/immagini/UploadWidget";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import LayoutClinica from "@/components/dashboard/common/LayoutClinica";
import { Button } from "@/components/ui/button";

// export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    idCliente: string;
    idPiano: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const data: { url: string }[] = await getImageByIdPiano(
    searchParams.idPiano?.toString() ?? ""
  );

  return (
    <LayoutClinica
      searchParams={{
        idCliente: searchParams.idCliente,
        idPianoCura: searchParams.idPiano,
      }}
    >
      <div className="w-full">
        <div className="my-4">
          {searchParams.idPiano?.toString() && <UploadWidget />}
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className=""
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                      <form action={deleteImage}>
                        <input
                          type="hidden"
                          value={searchParams.idPiano}
                          name="idPiano"
                        />
                        <input type="hidden" value={item.url} name="url" />

                        <Button
                          type="submit"
                          className="absolute top-3 right-3"
                        >
                          X
                        </Button>
                      </form>
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                      <Image
                        src={item.url}
                        alt={item.url}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </LayoutClinica>
  );
}
