import React from "react";
import ReactDOM from "react-dom";
import "./style/reset.scss";
import "./style/style.scss";
import "./style/responsive.scss";
import StatisticManager from "./components/StatisticManager.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

class App extends React.Component {
    render() {
        return <Provider store={ store } >
            <StatisticManager />
        </Provider>
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
