import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  ref,
  push,
  update,
  serverTimestamp,
  onChildAdded,
  onChildRemoved,
  onValue,
  orderByChild,
  get,
  child,
  query,
  equalTo,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuC81NLZPfrsCdCmy76URuL5Tka3FKhh4",
  authDomain: "pwa-firebase-egsi.firebaseapp.com",
  databaseURL:
    "https://pwa-firebase-egsi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pwa-firebase-egsi",
  storageBucket: "pwa-firebase-egsi.appspot.com",
  messagingSenderId: "586763837328",
  appId: "1:586763837328:web:14ce95e75caef8a9ee1d15",
  measurementId: "G-59E7Y8SJ36",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function createPresentation({ title }) {
  const path = ref(database, `/presentations`);
  const presentationRef = push(path, { title, slides: {} });
  initPresentation({ presentationId: presentationRef.key });
}

export function initPresentation({ presentationId }) {
  const path = ref(database, `/presentations/${presentationId}/slides`);

  createSlide({ presentationId });
}

export function createSlide({ presentationId }) {
  const path = ref(database, `/slides`);
  const slideKey = push(path, { presentationId, content: "" }).key;

  const updates = {};
  updates[`/presentations/${presentationId}/slides/${slideKey}`] = true;

  return update(ref(database), updates);
}

export function updateSlide({ slideId, content = new Date() }) {
  const path = ref(database, `/slides/${slideId}`);
  const updates = {};
  updates[`/content`] = content;
  return update(path, updates);
}

export function deleteSlide({ presentationId, slideId }) {
  const path = ref(database);
  const updates = {};
  updates[`/slides/${slideId}`] = null;
  updates[`/presentations/${presentationId}/slides/${slideId}`] = null;
  return update(path, updates);
}

export async function getSlides({ presentationId }) {
  const path = ref(database, `/slides/`);
  const result = await get(
    query(path, orderByChild("presentationId"), equalTo(presentationId))
  );
  console.log(result.val());
  return result.val();
}

// Get a list of cities from your database
// export function getCities(cb = () => {}) {

//   let data = [];
//   const path = ref(database, '/cities');

//   onValue(path, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//   });

//   onChildAdded(path, (snapshot) => {
//     data.push({
//       key: snapshot.key,
//       ...snapshot.val(),
//     });
//     cb(data);
//   });

//   onChildRemoved(path, (snapshot) => {
//     data = data.filter((item) => item.key != snapshot.key);
//     cb(data);
//   });
// }
