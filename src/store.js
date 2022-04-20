// import React from "react";
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import formReducer from "./reducers/formReducer";

// const reducer = combineReducers({ formReducer: formReducer });

// const persistConfig = {
//   key: "authType",
//   storage: storage,
//   whitelist: ["formReducer"], // which reducer want to store
// };

// const pReducer = persistReducer(persistConfig, reducer);
// const middleware = applyMiddleware(thunk, logger);
// const store = createStore(pReducer, middleware);
// const persistor = persistStore(store);
// export { persistor, store };
