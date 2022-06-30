import Router from "preact-router";
import { Editor } from "./editor";

export function App(props) {
  return (
    <Router>
      <Editor path="/editor" />
    </Router>
  );
}
