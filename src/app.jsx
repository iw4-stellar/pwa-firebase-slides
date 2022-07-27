import Router from "preact-router";
import { Editor } from "./editor";
import Dashboard from "./components/dashboard";

export function App(props) {
  return (
    <Router>
      <Dashboard path="/dashboard" />
      <Editor path="/editor/:presentationId" />
    </Router>
  );
}
