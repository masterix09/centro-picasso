"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { colors } from "@/utils/colors";
import { Paintbrush } from "lucide-react";
import { useMemo, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function PickerExample({
  background,
  setBackground,
}: {
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const [background, setBackground] = useState(
  //   "linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)"
  // );

  return (
    <div
      className="preview flex h-full  w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="flex w-full items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[300px] w-[350px] ">
        <ScrollArea className="h-full p-4">
          <div className="mt-0 flex flex-wrap gap-1">
            {colors.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

const GradientButton = ({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="relative rounded-md !bg-cover !bg-center p-0.5 transition-all"
      style={{ background }}
    >
      <div className="rounded-md bg-popover/80 p-1 text-center text-xs">
        {children}
      </div>
    </div>
  );
};
