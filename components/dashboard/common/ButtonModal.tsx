"use client";
import { Button } from "@/components/ui/button";
import { EModalType } from "@/enum/types";
import { useStore } from "@/store/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

const ButtonModal = ({
  value,
  type,
  children,
  variant,
  className,
}: {
  value?: string;
  type: string;
  children?: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}) => {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const { setModalOpen, setModalType } = useStore((state) => state);

  // const handleClick = () => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("modalOpen", "true");
  //   params.set("modalType", type);
  //   replace(`${pathname}?${params.toString()}`);
  // };

  const handleClick = () => {
    // const params = new URLSearchParams(searchParams);
    // params.set("modalOpen", "true");
    // params.set("modalType", type);
    // router.replace(`${pathname}?${params.toString()}`);
    setModalOpen(true);
    setModalType(type as EModalType);
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant ?? "default"}
      className={className}
    >
      {value || children}
    </Button>
  );
};

export default ButtonModal;
