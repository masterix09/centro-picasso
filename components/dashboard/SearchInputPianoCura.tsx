"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useState } from "react";
import { IPaziente, IPianoCura } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/store";
import { getNoteByIdPiano } from "@/actions/actions.clinica";

const SearchInputPianoCura = ({
  label,
  placeholder,
  items,
  value,
  displayValue,
  emptyMessage,
}: {
  label: string;
  placeholder: string;
  items?: {
    id: string;
    titolo: string | null;
    createdAt: Date | null;
    preventivoId: string | null;
    clienteId: string;
  }[];
  value: string;
  displayValue: string;
  emptyMessage: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { setIdPiano } = useStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value ? displayValue : label}
          <Search
            color="#545454"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {items && (
              <CommandGroup>
                {items?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.titolo ?? ""}
                    onSelect={(currentValue) => {
                      // setValue(currentValue === value ? "" : currentValue);

                      setOpen(false);

                      router.push(
                        pathname + "?" + createQueryString("idPiano", item.id)
                      );

                      setIdPiano(item.id);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.titolo}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchInputPianoCura;
