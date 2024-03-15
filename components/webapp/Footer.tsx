import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-100 h-100 py-7 px-0 flex justify-center items-center bg-[#2a4b9a] mt-[80px]">
      <div className="w-[90%] md:w-[95%] flex justify-center items-center flex-col md:flex-row ">
        <div className="flex flex-col gap-14 w-100 md:w-[20%] md:h-100 mt-14 md:mt-0">
          <Link href="/">
            <Image
              src="/images/Centro_Picasso_Icon.svg"
              alt="Logo dello studio dentistico Centro Picasso in Sant'antimo provincia di napoli"
              width={28}
              height={25}
            />
          </Link>

          <Link href="/">
            <Image
              src="/images/Centro_Picasso_Logotipo_bianco.svg"
              alt="logo dello studio dentistico Centro picasso in Sant'antimo provincia di Napoli"
              width={200}
              height={45}
            />
          </Link>
        </div>
        <div className="w-100 md:w-[45%] flex flex-col mt-14 md:mt-0">
          <h3 className="text-white mb-4">Le nostre sedi</h3>
          <div className="w-100 flex flex-col md:flex-row gap-5 md:gap-0">
            <div className="w-100 md:w-[50%] flex flex-col gap-2 md:gap-4 pr-0 md:pr-[45px]">
              <p className="text-white">
                Via Pablo Picasso 104 Sant’Antimo, 80029 NA
              </p>
              <p className="text-white">Tel: +39 081 833 9593</p>
            </div>
            <div className="w-100 md:w-[50%] flex flex-col gap-2 md:gap-4 pr-0 md:pr-[45px]">
              <p className="text-white">
                Via Biagio Riccio 9 Giugliano, 80014 NA
              </p>
              <p className="text-white">Tel: +39 081 506 2565</p>
            </div>
          </div>
        </div>
        <div className="w-100 md:w-[20%] flex flex-col mt-[60px] md:mt-0">
          <h3 className="text-white">Email</h3>
          <div className="w-100 flex flex-col gap-6">
            <p className="text-white">conttatto1@centropicasso.it</p>
            <p className="text-white">conttatto2@centropicasso.it</p>
          </div>
        </div>
        <div className="w-100 md:w-[15%] flex flex-col mt-[60px] md:mt-0">
          <h3 className="text-white">Instagram</h3>
          <div className="w-100 flex flex-col gap-6">
            <p className="text-white">Instagram profile</p>
          </div>
          <h3 className="text-white mb-4">Facebook</h3>
          <div className="w-100 flex flex-col gap-6">
            <p className="text-white">Facebook profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
