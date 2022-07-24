import { createPresentation, createSlide, updateSlide, deleteSlide, getSlides } from "../firebase";

export function App(props) {
  return (
    <div style={{ display: "flex", width: "100%", gap: "20px" }}>
        <button style={{border: "1px black solid"}} onClick={() => createPresentation({ title: "Test" })}>new pres</button>
        <button style={{border: "1px black solid"}} onClick={() => createSlide({ presentationId: "-N5kUO-Kjo-9Bw4mOCpb" })}>new slide</button>
        <button style={{border: "1px black solid"}} onClick={() => updateSlide({ slideId: "-N6IgAF_h1ashqdK5Wpu" })}>edit slide</button>
        <button style={{border: "1px black solid"}} onClick={() => deleteSlide({ presentationId: "-N5kUO-Kjo-9Bw4mOCpb", slideId: "-N6IopFxtZ0WVW3IK6RO" })}>delete slide</button>
        <button style={{border: "1px black solid"}} onClick={() => getSlides({ presentationId: "-N5kUO-Kjo-9Bw4mOCpb" })}>get slides</button>
    </div>
  );
}
