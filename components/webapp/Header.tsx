"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useIsSM } from "@/utils/useWindowSizes";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="bg-[#0F88F2] flex justify-center items-center w-100 flex-column md:flex-row py-5 z-20 relative">
        <div className="flex justify-between items-center w-[80%]">
          <div className="w-[20%] flex items-start justify-center">
            <Link href="/">
              {useIsSM() ? (
                <Image
                  src="/images/Centro_Picasso_Icon.svg"
                  alt="Logo dello studio dentistico Centro Picasso in Sant'antimo provincia di napoli"
                  width={30}
                  height={30}
                  // className={styles.bg}
                />
              ) : (
                <Image
                  src="/images/Centro_Picasso_Logotipo_bianco.svg"
                  alt="Logo dello studio dentistico Centro Picasso in Sant'antimo provincia di napoli"
                  width={250}
                  height={80}
                  // className={styles.bg}
                />
              )}
            </Link>
          </div>

          <nav className="w-[60%] flex justify-center items-center">
            <ul className="flex gap-[40px] no-bullet">
              <li>
                <Link
                  href="/"
                  className="no-underline text-white text-[20px] md:block hidden"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/servizi"
                  className="no-underline text-white text-[20px] md:block hidden"
                >
                  Servizi
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="no-underline text-white text-[20px] md:block hidden"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          <div className="w-[20%] md:flex items-center justify-center gap-4 hidden">
            <Link href="tel:081083309593">
              <Image
                src="/images/navbar/Centro_Picasso_icon_telefono.svg"
                alt="telefono"
                width={40}
                height={40}
              />
            </Link>
            <Link href="https://www.facebook.com/centropicasso/?locale=it_IT">
              <Image
                src="/images/navbar/Centro_Picasso_icon_Facebook.svg"
                alt="facebook"
                width={40}
                height={40}
              />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <Image
                src="/images/navbar/Centro_Picasso_icon_Instagram.svg"
                alt="instagram"
                width={40}
                height={40}
              />
            </Link>
          </div>

          <div
            className="flex gap-y-[5px] flex-col md:hidden w-fit h-fit"
            onClick={() => setIsShow(!isShow)}
          >
            <span className="w-[30px] h-[4px] bg-white block"></span>
            <span className="w-[30px] h-[4px] bg-white block"></span>
            <span className="w-[30px] h-[4px] bg-white block"></span>
          </div>
        </div>
      </div>
      {isShow && (
        <div className="w-screen py-[20px] px-0 bg-[#0F88F2] relative flex justify-center items-center z-10">
          <nav>
            <ul className="d-flex gap-20 flex-direction-column no-bullet">
              <li>
                <Link href="/" className="no-underline text-white text-[20px]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/servizi"
                  className="no-underline text-white text-[20px]"
                >
                  Servizi
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="no-underline text-white text-[20px]"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
