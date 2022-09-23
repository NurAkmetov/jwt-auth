import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {Provider} from "react-redux";
import {setupStore} from "./state/rootStore";
import {BrowserRouter} from "react-router-dom";
import './index.module.scss';

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
