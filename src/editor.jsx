import { nanoid } from "nanoid";
import { useEffect, useState, useMemo } from "preact/hooks";
import { usePresentationStore } from "./store/presentation";
import { PencilIcon } from "./components/icons/pencil";
import { CollectionIcon } from "./components/icons/collection";
import { SlideEditor } from "./components/editor/slide-editor";
import { SlideShow } from "./components/editor/slide-show";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white.css";
import "quill/dist/quill.snow.css";
import "./editor.css";

export function Editor(props) {
  const presentation = usePresentationStore((s) => s.presentation);
  const setPresentation = usePresentationStore((s) => s.setPresentation);
  const setSlide = usePresentationStore((s) => s.setSlide);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(null);
  const currentSlideNumber = useMemo(() => {
    if (presentation === null || currentSlide === null) return 0;

    return presentation.slides.map((s) => s.id).indexOf(currentSlide.id);
  }, [presentation, currentSlide]);

  // Toggle edit mode value
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSlideUpdate = (newContent) => {
    const newSlide = { ...currentSlide, content: newContent };

    setSlide(newSlide);
    setCurrentSlide(newSlide);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(presentation.slides[index]);
  };

  useEffect(() => {
    setIsLoading(true);
    const fakePresentation = {
      owner: nanoid(),
      slides: [
        {
          id: nanoid(),
          content: "<h1>Hello slide 1</h1>",
        },
        {
          id: nanoid(),
          content: "<h1>Hello slide 2</h1>",
        },
      ],
    };

    setTimeout(() => {
      setPresentation(fakePresentation);
      setCurrentSlide(fakePresentation.slides[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const modeToggler = isEditMode ? (
    <button class="btn has-icon" onClick={toggleEditMode}>
      <CollectionIcon />
      Present
    </button>
  ) : (
    <button class="btn has-icon" onClick={toggleEditMode}>
      <PencilIcon />
      Edit
    </button>
  );

  return (
    <div className="Editor">
      <div className="Editor__header">
        <h2 class="text-2xl font-black">Editor</h2>

        <div className="Editor__header__actions">{modeToggler}</div>
      </div>
      <div className="Editor__body">
        {isLoading ? (
          <div>Loading...</div>
        ) : isEditMode ? (
          <SlideEditor slide={currentSlide} onUpdate={handleSlideUpdate} />
        ) : (
          <SlideShow
            currentPage={currentSlideNumber}
            onSlideChange={handleSlideChange}
          />
        )}
      </div>
    </div>
  );
}
