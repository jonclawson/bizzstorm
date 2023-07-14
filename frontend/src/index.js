import React from 'react';
import ReactDOM from 'react-dom/client';
// import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {  RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {router} from './routes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
