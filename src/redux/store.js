import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
const logger = createLogger({ level: 'log' })
const middlewares = [ thunk,logger ];
export default createStore(rootReducer, applyMiddleware(...middlewares))