import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from '@components/Wrapper';
import routes from '@utils/routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper routes={routes}>
        <Routes>
          {routes.map(({ title, path, element }) => (
            <Route key={title} path={path} Component={element} />
          ))}
        </Routes>
      </Wrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
