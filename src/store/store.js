import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const initialState = {
    statistics: []
};

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_STATISTICS' :
            return { ...state, statistics: action.statistics };
        default:
            return state;
    }
    return state;
}

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(thunk))
)

export default store;
