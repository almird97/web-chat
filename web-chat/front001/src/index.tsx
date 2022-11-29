import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import './css/stilovi.css';
import ChatIndex from './chat/ChatIndex';
import Pocetna from './components/Pocetna';

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(

  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >

    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="chat" element={<ChatIndex />} />
      </Routes>
    </Router>

  </Auth0Provider>,
  document.getElementById('root')
);