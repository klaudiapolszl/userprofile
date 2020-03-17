import React from 'react';
import ReactDOM from 'react-dom';
import './style/reset.scss';
import './style/style.scss';
import './style/responsive.scss';
import StatisticManager from './components/StatisticManager.jsx';

class App extends React.Component {
    render() {
        return <div>
            <StatisticManager />
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
