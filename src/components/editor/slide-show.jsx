import { useEffect } from "preact/hooks";
import Reveal from "reveal.js";
import { usePresentationStore } from "../../store/presentation";
// Remind to import these in parent component:
// import "reveal.js/dist/reveal.css";
// import "reveal.js/dist/theme/white.css";

export function SlideShow({ currentPage, onSlideChange }) {
  const presentation = usePresentationStore((s) => s.presentation);
  useEffect(() => {
    const deck = new Reveal({ embedded: true, slideNumber: true });
    deck.initialize();

    deck.on("slidechanged", (event) => {
      onSlideChange(event.indexh);
    });

    () => {
      deck.destroy();
    };
  }, []);

  const sections =
    presentation && presentation.slides ? (
      presentation.slides.map((slide) => {
        return (
          <section key={slide.id}>
            <div dangerouslySetInnerHTML={{ __html: slide.content }}></div>
          </section>
        );
      })
    ) : (
      <section>
        <p>Nothing to show</p>
      </section>
    );

  return (
    <div class="reveal">
      <div class="slides">{sections}</div>
    </div>
  );
}
