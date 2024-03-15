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
import { useState } from "react";
import { getPazienti } from "@/actions/actions.clinica";
import { IPaziente } from "@/types";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const SearchInput = ({
  label,
  placeholder,
  items,
}: {
  label: string;
  placeholder: string;
  items?: IPaziente[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const getNomeCognome = () => {
    const find = items?.find((framework) => framework.id === value);
    return `${find?.cognome} ${find?.nome}`;
  };

  React.useEffect(() => {
    try {
      const response = fetch(`/api/getPianoCura/${value}`, {
        method: "GET",
      });
    } catch (error) {}
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value ? getNomeCognome() : label}
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
          <CommandGroup>
            {items &&
              items.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.cognome} {framework.nome}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchInput;
