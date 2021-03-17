import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "react-thunk";

import uploadReducer from "./uploadDuck";

let rootReducer = combineReducers({
  upload: uploadReducer,
});

/* Redux Dev Tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
