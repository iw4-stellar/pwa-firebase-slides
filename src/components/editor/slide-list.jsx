import { usePresentationStore } from "../../store/presentation";
import { useCallback, useMemo } from "preact/hooks";

export function SlideList() {
  const presentation = usePresentationStore((s) => s.presentation);
  const slides = (presentation?.slides || []).map((slide, index) => (
    <div className="slide" key={slide.id}>
      <p>{index + 1}</p>
    </div>
  ));

  return <div className="SlideList">{slides}</div>;
}
