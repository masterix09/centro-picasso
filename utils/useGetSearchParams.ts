import { useSearchParams } from 'next/navigation';
import React from 'react'

const useGetSearchParams = () => {
  
    const searchParams = useSearchParams();
  const idPiano = searchParams.get("idPiano");
  const idDente = searchParams.get("dente");

  return {idPiano, idDente}
}

export default useGetSearchParams