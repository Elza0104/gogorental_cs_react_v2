import React from 'react';
import ReactDOM from 'react-dom/client';
import "./component/index.css";
import theme from "./theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./font/Pretendard-1.3.9/web/static/pretendard.css"
import ScrollToTop from './component/ScrollTop';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
    <BrowserRouter>
      <ScrollToTop/>
      <App>
        <CssBaseline />
      </App>
      </BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>
);
