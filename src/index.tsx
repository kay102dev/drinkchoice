import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./components/app/app";
import Modal from "./components/util/modal";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);