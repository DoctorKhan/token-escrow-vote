// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";


var React = require('react');
var ReactDOM = require('react-dom');

import Layout from './components/Layout';




const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
