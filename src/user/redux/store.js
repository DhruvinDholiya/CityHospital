import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import thunk from "redux-thunk"
import createSagaMiddleware from "@redux-saga/core"
import { CounterSaga } from '../sagas/Counter.Saga';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['medicines', 'cart', 'favourites']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(CounterSaga); 

    const persistor = persistStore(store);
    return { store, persistor };
};
