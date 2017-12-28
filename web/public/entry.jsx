//入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import { Provider } from "react-redux";
// import { Values } from "redux-form-website-template";
 

import SimpleForm from "./pages/SimpleForm.jsx";
import Home from './pages/Home.jsx';
import ShowResults from "./pages/ShowResults.jsx";
import store from "./store.jsx";
const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Simple Form</h2>
      <Home />
      
      {/* <SimpleForm /> */}
      {/* <Values form="simple" />  */}
      {/* 显示values的地方 大括号括起来的那里 */}
    </div>
  </Provider>,
  rootEl
);
// simple form本来onsubmit可以在本页面写一个handlesubmit来直接调用
// 但是这个例子里 把这个函数 打包成了一个组件进行调用 更清晰



 