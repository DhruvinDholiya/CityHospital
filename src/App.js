import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoute from './routes/PrivateRoute';
import { Provider } from 'react-redux';
import { configureStore } from './user/redux/store';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const {store, persistor} = configureStore();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<PrivateRoute />}>
            <Route path="*" element={<AdminRoutes />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
