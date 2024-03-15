"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type contextType = {
  idCliente: string;
  idPiano: string;
  setCliente: (value: string) => void;
  setPiano: (value: string) => void;
};

const authContextDefaultValues: contextType = {
  idCliente: "",
  idPiano: "",
  setCliente: () => {},
  setPiano: () => {},
};

const Context = createContext<contextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(Context);
}

type Props = {
  children: ReactNode;
};

export function Provider({ children }: Props) {
  const [data, setData] = useState<{ idCliente: string; idPiano: string }>({
    idCliente: "",
    idPiano: "",
  });

  const setCliente = (value: string) => {
    setData({
      idPiano: data.idPiano,
      idCliente: value,
    });
  };
  const setPiano = (value: string) => {
    setData({
      idCliente: data.idCliente,
      idPiano: value,
    });
  };

  const value = {
    idPiano: "",
    idCliente: "",
    setCliente,
    setPiano,
  };
  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
}
