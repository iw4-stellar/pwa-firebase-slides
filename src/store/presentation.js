import create from "zustand";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export const usePresentationStore = create((set) => ({
  isPresentationsLoading: false,

  presentations: [],

  getPresentations: async () => {
    console.log("getPresentations");
    set({ isPresentationsLoading: true });

    const presCollectionRef = collection(db, "presentations");
    const { docs } = await getDocs(presCollectionRef);

    set({
      presentations: docs.map((d) => ({ id: d.id, ...d.data() })),
      isPresentationsLoading: false,
    });
  },

  postPresentation: async (title) => {
    return await addDoc(collection(db, "presentations"), { title });
  },

  deletePresentation: async (id) => {
    await deleteDoc(doc(db, "presentations", id));
  },

  presentation: null,

  setPresentation: (presentation) => {
    set({ presentation });
  },
  setSlide: (newSlide) => {
    set((state) => {
      return {
        presentation: {
          ...state.presentation,
          slides: state.presentation.slides.map((slide) => {
            if (slide.id === newSlide.id) {
              return { ...slide, ...newSlide };
            }

            return slide;
          }),
        },
      };
    });
  },
}));
