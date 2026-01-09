import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Swal from "sweetalert2";
import type { CVData } from "../domain/cv.types";
import { INITIAL_CV_DATA } from "../domain/cv.constants";
import { migrateCVData } from "../services/storage/migrateCVData";

interface CvState {
  data: CVData;
  updateData: (newData: Partial<CVData>) => void;
  reset: () => void;
}

export const useCvStore = create<CvState>()(
  persist(
    (set) => ({
      data: INITIAL_CV_DATA,

      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),

      reset: async () => {
        const result = await Swal.fire({
          title: "Êtes-vous sûr ?",
          text: "Toutes vos données locales seront supprimées définitivement.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Oui, effacer tout",
          cancelButtonText: "Annuler",
        });

        if (result.isConfirmed) {
          set({ data: INITIAL_CV_DATA });

          Swal.fire({
            title: "Réinitialisé !",
            text: "Votre CV est de nouveau vierge.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      },
    }),
    {
      name: "cv-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.data) {
          state.data = migrateCVData(state.data);
        }
      },
    }
  )
);
