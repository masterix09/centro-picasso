import { EFetchLabel, EListino, EModalType } from '@/enum/types'
import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface StateSchema {
  idPiano: string,
  idCliente: string,
  idPrestazioneAgenda: string,
  idPrestazione: string,
  idOperatore: string,
  idSede: string,
  idDocumento: string,
  modalOpen: boolean,
  modalType: string,
  idDente: string,
  defaultValues: object,
  listino: EListino,
  setIdPiano: (id: string) => void
  setIdCliente: (id: string) => void
  setIdPrestazioneAgenda: (id: string) => void
  setIdPrestazione: (id: string) => void
  setIdOperatore: (id: string) => void,
  setIdSede: (id: string) => void,
  setIdDocumento: (id: string) => void,
  setModalType: (id: EModalType) => void,
  setModalOpen: (id: boolean) => void,
  setIdDente: (id: string) => void,
  setDefaultValues: (values: object) => void,
  setListino :  (values: EListino) => void,
  successPrenotazione: boolean
  setSuccessPrenotazione: (value: boolean) => void
  fetchLabel: EFetchLabel
  setFetchLabel: (value: EFetchLabel) => void
}

export const useStore = create<StateSchema>()( persist(
  (set) => ({
    idCliente: "",
    idPiano: "",
    idPrestazioneAgenda: "",
    idPrestazione: "",
    idOperatore: "",
    idSede: "",
    idDocumento: "",
    modalOpen: false,
    modalType: "",
    idDente: "",
    defaultValues: {},
    listino: EListino.DEFAULT,
    setIdPiano: (id) => set((state) => ({ ...state, idPiano: id, })),
    setIdCliente: (id) => set((state) => ({ ...state, idCliente: id, idPiano: "" })),
    setIdPrestazioneAgenda: (id) => set((state) => ({...state, idPrestazioneAgenda: id})),
    setIdPrestazione: (id) => set((state) => ({...state, idPrestazione: id})),
    setIdOperatore: (id) => set((state) => ({...state, idOperatore: id})),
    setIdSede: (id) => set((state) => ({...state, idSede: id})),
    setIdDocumento: (id) => set((state) => ({...state, idDocumento: id})),
    setModalOpen: (id) => set((state) => ({...state, modalOpen: id})),
    setModalType: (id) => set((state) => ({...state, modalType: id})),
    setIdDente: (id) => set((state) => ({...state, idDente: id})),
    setDefaultValues: (value) => set((state) => ({...state, defaultValues: value})),
    setListino: (value) => set((state) => ({...state, listino: value})),
    successPrenotazione: false,
    setSuccessPrenotazione: (value) => set((state) => ({successPrenotazione: value})),
    fetchLabel: EFetchLabel.NULL,
    setFetchLabel: (value) => set((state) => ({fetchLabel: value})),
  
  }), {name: "store"})
) 