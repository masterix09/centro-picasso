import Image from "next/image";
import loaderImg from "@/public/animation.gif";

export default function Loading() {
  return (
    <Image
      src={loaderImg}
      alt="loader"
      priority
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
}
