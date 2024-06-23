    import { combineReducers, createStore } from "redux";
    import bookManagementReducer from "./reducers/bookManagementReducer";

    const rootReducer = combineReducers({
        bookManagementReducer
    })
    const store = createStore(rootReducer)
    export default store