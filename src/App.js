import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoute from './routes/PrivateRoute';
import { Provider } from 'react-redux';
import { configureStore } from './user/redux/store';

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
