// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/App';

// import './i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App/>);