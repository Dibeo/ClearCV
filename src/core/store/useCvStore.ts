import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Swal from "sweetalert2";
import type { CVData } from "../domain/cv.types";
import { EMPTY_CV_DATA, INITIAL_CV_DATA } from "../domain/cv.constants";
import { migrateCVData } from "../services/storage/migrateCVData";

// DeepPartial makes every property (including nested objects) optional.
// This allows us to merge only a subset of the CV data (e.g., just metadata.name).
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Recursive merge that respects existing values when the source property is undefined.
function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const output = { ...target } as Record<string, unknown>;
  for (const key in source) {
    const src = (source as Record<string, unknown>)[key];
    if (src === undefined) continue;
    const tgt = (target as Record<string, unknown>)[key];
    if (src && typeof src === "object" && !Array.isArray(src)) {
      output[key] = deepMerge(tgt ?? {}, src);
    } else {
      output[key] = src;
    }
  }
  return output as T;
}

interface CvState {
  data: CVData;
  // Accept deep partial updates, enabling nested fields to be merged safely.
  updateData: (newData: DeepPartial<CVData>) => void;
  reset: () => Promise<void>;
  exemple: () => Promise<void>;
}

export const useCvStore = create<CvState>()(
  persist(
    (set) => ({
      data: INITIAL_CV_DATA,

      updateData: (newData) =>
        set((state) => ({
          data: deepMerge(state.data, newData),
        })),

      reset: async () => {
        // ``Swal.fire`` returns a SweetAlertResult, but in tests we mock it with a plain object.
        // Casting to ``any`` sidesteps strict type checking of the mock shape.
        const result = await Swal.fire<unknown>({
          title: "Êtes-vous sûr ?",
          text: "Toutes vos données locales seront supprimées définitivement.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Oui, effacer tout",
          cancelButtonText: "Annuler",
        });

        if (result.isConfirmed) {
          set({ data: EMPTY_CV_DATA });

          // Success toast – its return value is ignored, ``any`` is sufficient.
          Swal.fire({
            title: "Réinitialisé !",
            text: "Votre CV est de nouveau vierge.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      },

      exemple: async () => {
        const result = await Swal.fire<unknown>({
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
