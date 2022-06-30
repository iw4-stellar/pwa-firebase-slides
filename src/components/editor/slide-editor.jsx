import Quill from "quill";
import { useEffect, useCallback, useState } from "preact/hooks";
// Remember to import these in parent component:
// import "quill/dist/quill.snow.css";

export function SlideEditor({ slide, onUpdate }) {
  const [quill, setQuill] = useState(null);
  const quillWrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline"],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "blockquote", "code-block"],
        ],
      },
    });

    if (slide) {
      q.root.innerHTML = slide.content;
    }
    setQuill(q);
  }, []);

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;

      const quillContent = quill.root.innerHTML;

      onUpdate(quillContent);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  return (
    <div className="SlideEditor">
      <div id="quill" ref={quillWrapperRef}></div>
    </div>
  );
}
