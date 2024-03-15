import React, { FC } from "react";
import Link from "next/link";
import styles from "../../../style/common/CtaButton.module.scss";

type CtaProps = {
  title: string;
  href?: string;
  bgColor?: string;
};

const CtaButton: FC<CtaProps> = ({ title, href, bgColor }) => {
  if (href) {
    return (
      <Link href={href} className="no-underline">
        {bgColor ? (
          <p
            className="text-[18px] text-white rounded bg-[#0f88f2] cursor-pointer py-2 px-5 md:py-[10px] md:px-4 xl:py-[10px] xl:px-7 text-center"
            style={{ backgroundColor: bgColor }}
          >
            {title}
          </p>
        ) : (
          <p className="text-[18px] text-white rounded bg-[#0f88f2] cursor-pointer py-2 px-5 md:py-[10px] md:px-4 xl:py-[10px] xl:px-7 text-center">
            {title}
          </p>
        )}
      </Link>
    );
  } else {
    return (
      <>
        {bgColor ? (
          <p
            className="text-[18px] text-white rounded bg-[#0f88f2] cursor-pointer py-2 px-5 md:py-[10px] md:px-4 xl:py-[10px] xl:px-7 text-center"
            style={{ backgroundColor: bgColor }}
          >
            {title}
          </p>
        ) : (
          <p className="text-[18px] text-white rounded bg-[#0f88f2] cursor-pointer py-2 px-5 md:py-[10px] md:px-4 xl:py-[10px] xl:px-7 text-center">
            {title}
          </p>
        )}
      </>
    );
  }
};

export default CtaButton;
