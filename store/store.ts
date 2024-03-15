import { EListino, EModalType } from '@/enum/types'
import { object } from 'zod'
import { create } from 'zustand'

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
}

export const useStore = create<StateSchema>()((set) => ({
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
  setIdPiano: (id) => set((state) => ({ idPiano: id, })),
  setIdCliente: (id) => set((state) => ({ idCliente: id, idPiano: "" })),
  setIdPrestazioneAgenda: (id) => set((state) => ({idPrestazioneAgenda: id})),
  setIdPrestazione: (id) => set((state) => ({idPrestazione: id})),
  setIdOperatore: (id) => set((state) => ({idOperatore: id})),
  setIdSede: (id) => set((state) => ({idSede: id})),
  setIdDocumento: (id) => set((state) => ({idDocumento: id})),
  setModalOpen: (id) => set((state) => ({modalOpen: id})),
  setModalType: (id) => set((state) => ({modalType: id})),
  setIdDente: (id) => set((state) => ({idDente: id})),
  setDefaultValues: (value) => set((state) => ({defaultValues: value})),
  setListino: (value) => set((state) => ({listino: value})),
}))

