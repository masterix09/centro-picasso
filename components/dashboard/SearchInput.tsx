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
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { getPazienti } from "@/actions/actions.clinica";
import { IPaziente, IPianoCura } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/store";

const SearchInput = ({
  label,
  placeholder,
  items,
  value,
  setValue,
  displayValue,
  // displayComboBoxValue,
  type,
}: {
  label: string;
  placeholder: string;
  items?: IPaziente[] | IPianoCura[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  displayValue: () => string;
  // displayComboBoxValue: string;
  type: "PAZIENTE" | "PIANO_CURA";
}) => {
  const [open, setOpen] = useState<boolean>(false);
  // const router = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [value, setValue] = useState<string>("");

  // const getNomeCognome = () => {
  //   const find = items?.find((framework) => framework.id === value);
  //   return `${find?.cognome} ${find?.nome}`;
  // };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setIdCliente = useStore((state) => state.setIdCliente);
  const setIdPiano = useStore((state) => state.setIdPiano);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value ? displayValue() : label}
          <Search
            color="#545454"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Nessun paziente trovato.</CommandEmpty>
          {items && (
            <CommandGroup>
              {items!.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);

                    setOpen(false);
                    {
                      type === "PAZIENTE" &&
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("idCliente", currentValue)
                        );
                      type === "PIANO_CURA" &&
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("idPiano", currentValue)
                        );
                    }
                    // {
                    //   type === "PAZIENTE" && setIdCliente(currentValue);
                    //   type === "PIANO_CURA" && setIdPiano(currentValue);
                    // }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type === "PAZIENTE" &&
                    // @ts-ignore
                    `${framework.cognome} ${framework.nome}`}
                  {type === "PIANO_CURA" &&
                    // @ts-ignore
                    `${framework.titolo}`}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchInput;
