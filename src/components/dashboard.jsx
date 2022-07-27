import { useEffect, useState, useRef } from "preact/hooks";
import { usePresentationStore } from "../store/presentation";
import { route } from "preact-router";
import TripleDots from "./icons/triple-dots";
import "../styles/dashboard.css";

const NewPresentation = () => {
  const { postPresentation } = usePresentationStore();
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsPending(true);

    const presentation = await postPresentation(title);

    setIsPending(false);

    route(`/editor/${presentation.id}`);
  };

  const onTitleChange = (evt) => {
    setTitle(evt.target.value);
  };

  return (
    <div id="new-presentation">
      <h2 className="title">New presentation</h2>
      <form class="form" onSubmit={onFormSubmit}>
        <input
          id="presentation-title"
          type="text"
          ref={titleRef}
          value={title}
          onChange={onTitleChange}
          placeholder="Untitled"
        />
        <button>Create</button>
      </form>
    </div>
  );
};

const PresentationListSkeleton = ({ count = 5 }) => {
  const presentations = new Array(count).fill({});

  return (
    <div id="presentation-list-skeleton">
      {presentations.map((p, i) => (
        <div key={i} className="presentation">
          <div class="title"></div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

const Presentation = ({ presentation, onClick, onDelete }) => {
  const [showOpts, setShowOpts] = useState(false);

  const onShowOptionsClick = (evt) => {
    evt.stopPropagation();

    setShowOpts(!showOpts);
  };

  return (
    <div className="presentation" onClick={onClick}>
      <h2 class="title">{presentation.title}</h2>
      <div className="options">
        <button onClick={onShowOptionsClick}>
          <TripleDots />
        </button>
        {showOpts && <button onClick={onDelete}>Delete</button>}
      </div>
    </div>
  );
};

const PresentationList = ({}) => {
  const { presentations, deletePresentation } = usePresentationStore();

  const onPresentationClick = (id) => {
    route(`/editor/${id}`);
  };

  const onPresentationDelete = (evt, id) => {
    evt.stopPropagation();

    if (confirm("Are you sure?")) {
      deletePresentation(id);
    }
  };

  return (
    <div id="presentation-list">
      {presentations.map((p) => (
        <Presentation
          presentation={p}
          onClick={(evt) => onPresentationClick(evt, p.id)}
          onDelete={(evt) => onPresentationDelete(evt, p.id)}
        />
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { isPresentationsLoading, getPresentations } = usePresentationStore();

  useEffect(() => {
    getPresentations();
  }, []);

  return (
    <div id="dashboard">
      <header>
        <h1>Dashboard</h1>
      </header>

      <main class="container mx-auto">
        <NewPresentation />
        {isPresentationsLoading ? (
          <PresentationListSkeleton />
        ) : (
          <PresentationList />
        )}
      </main>
    </div>
  );
}
