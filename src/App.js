import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { Provider } from 'react-redux';
import { persistor, store } from './user/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './user/context/ThemeContext';
import Alert from './user/UI/alert/Alert';
import { SnackbarProvider } from 'notistack';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <PersistGate persistor={persistor}>
          <Alert />
          <ThemeProvider>
            <Routes>
              <Route path="/*" element={<UserRoutes />} />
              <Route path="/admin/*" element={<PrivateRoute />} >
                <Route path="*" element={<AdminRoutes />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </PersistGate>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;



