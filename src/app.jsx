import Router from "preact-router";
import { Editor } from "./editor";

export function App(props) {
  return (
    // <div className="flex justify-center">
    //   <h1 className="title">
    //     Open Slides PWA       
    //   </h1>
    //   <div className="project-wrapper">
    //     <div className="new-project">
    //         <a href="index.html">
    //             <img src="/src/plus.gif" className="gif"/>
    //         </a>
    //     </div>
    //   </div>
    //   <div class="project">
    //     <div class="project-container">
    //         <img src="thumbnail.png" class="thumbnail"/>
    //     </div>
    //   </div>


    // </div>
    <Router>
      <Editor path="/editor" />
    </Router>
  );
}
