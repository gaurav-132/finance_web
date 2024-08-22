import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store.jsx'
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

library.add(fab, fas, far);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <App />
        </Provider>
    </StrictMode>,
)
