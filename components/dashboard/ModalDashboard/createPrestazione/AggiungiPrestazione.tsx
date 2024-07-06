import { getPrestazioniList } from "@/actions/actions.clinica";
import { TPrestazioneLista } from "@/app/(dashboard)/prestazioniLista/page";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckedState } from "@radix-ui/react-checkbox";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const AggiungiPrestazione = ({
  form,
}: {
  form: UseFormReturn<
    {
      sede: string;
      operatore: string;
      prestazioni: string[];
    },
    any,
    undefined
  >;
}) => {
  const [data, setData] = useState<TPrestazioneLista[]>([]);
  const [prestazioni, setPrestazioni] = useState<TPrestazioneLista[]>([]);
  const [categoria, setCategoria] = useState<string>("");

  useEffect(() => {
    getPrestazioniList().then((data) => setData(data));
  }, []);

  type TPrestazione = {
    id: string;
    nome: string | null;
  };

  interface Categoria {
    nome: string;
  }

  function raggruppaPrestazioniPerCategoria(
    lista: TPrestazioneLista[]
  ): Categoria[] {
    const categorieMap: { [categoria: string]: TPrestazione[] } = {};

    lista.forEach((prestazione) => {
      const categoria = prestazione.categoria;
      if (!categoria) return; // Ignora le prestazioni senza categoria

      if (!categorieMap[categoria]) {
        categorieMap[categoria] = [];
      }

      // Aggiungo la prestazione all'array delle prestazioni corrispondente alla categoria
      categorieMap[categoria].push({
        id: prestazione.id,
        nome: prestazione.nome,
        // aggiungi altre proprietà della prestazione se necessario
      });
    });

    const categorieArray: Categoria[] = Object.keys(categorieMap).map(
      (categoria) => ({
        nome: categoria,
      })
    );

    return categorieArray;
  }

  const categorieSingole = raggruppaPrestazioniPerCategoria(data);

  const addPrestazione = (value: CheckedState, item: TPrestazioneLista) => {
    if (value === true) {
      setPrestazioni([...prestazioni, item]);
    }
    if (value === false) {
      const prestazioniFilter = prestazioni.filter((obj) => obj.id !== item.id);
      setPrestazioni(prestazioniFilter);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-full md:w-1/3 md:border-r-2 border-r-gray-400">
        {categorieSingole.map((item, idx) => {
          return (
            <p
              key={idx}
              className="my-2 bg-slate-200 shadow rounded px-2 w-fit hover:cursor-pointer"
              onClick={() => setCategoria(item.nome as string)}
            >
              {item.nome}
            </p>
          );
        })}
      </div>
      <div className="w-full md:w-2/3 ">
        {/* {data.map((item) => {
          return (
            item.categoria === categoria && (
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="terms1"
                  onCheckedChange={(value) => addPrestazione(value, item)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.nome}
                  </label>
                </div>
              </div>
            )
          );
        })} */}

        <FormField
          control={form.control}
          name="prestazioni"
          render={() => (
            <FormItem>
              <ScrollArea className="w-full h-[300px]">
                {data
                  .filter((obj) => obj.categoria === categoria)
                  .map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="prestazioni"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.nome}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AggiungiPrestazione;
