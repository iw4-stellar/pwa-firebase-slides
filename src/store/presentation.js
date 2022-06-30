import create from "zustand";

export const usePresentationStore = create((set) => ({
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
