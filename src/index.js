import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

let installer = undefined;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installer = e;
});

ReactDOM.render(<App prompt={() => installer} />, document.getElementById('root'));

serviceWorker.register();
setTimeout(function () {
    import('./episodes/search')
});