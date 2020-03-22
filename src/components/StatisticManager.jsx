import React from 'react';
import CommentsManager from './CommentsManager.jsx';
import AddComment from './AddComment.jsx';
import { connect } from "react-redux";
import getStatistics, { addLike, subtractLike, addFollow, subtractFollow } from "../services/userServices.js";

class StatisticManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like_heart: 'none',
            unlike_heart: 'inline-block',
            follow_btn_color: "",
            follow_btn_click: 0,
            share_address_toggle: "none",
            location: window.location.href
        }
    }

    componentDidMount() {
        this.props.getStatistics();
    }

    handleHeartClick = (id) => {
        if(this.state.unlike_heart==="inline-block") {
            this.props.addLike(this.props.statistics, id);
            this.setState({
                unlike_heart: 'none',
                like_heart: 'inline-block'
            });
        } else {
            this.props.subtractLike(this.props.statistics, id);
            this.setState({
                like_heart: 'none',
                unlike_heart: 'inline-block',
            });
        }
    };

    handleFollowClick = (id) => {
        if(this.state.follow_btn_click === 0) {
            this.props.addFollow(this.props.statistics, id);
            this.setState({
                follow_btn_color: "#002C71",
                follow_btn_click: this.state.follow_btn_click + 1
            });
            /*let getFollowers = this.props.statistics.slice();
            getFollowers[0].followers++;
            fetch(`http://localhost:4000/statistics/${1}`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getFollowers[0])
            });

            this.setState({
                follow_btn_color: "#002C71",
                follow_btn_click: this.state.follow_btn_click + 1
            });*/
        } else {
            this.props.subtractFollow(this.props.statistics, id);
            this.setState({
                follow_btn_color: "#FFA640",
                follow_btn_click: 0
            });
            /*
            let getFollowers = this.props.statistics.slice();
            getFollowers[0].followers--;
            fetch(`http://localhost:4000/statistics/${1}`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getFollowers[0])
            });
            this.setState({
                follow_btn_color: "#FFA640",
                follow_btn_click: 0
            });*/
        }
    };

    handleShareClick = () => {
        if(this.state.share_address_toggle === "none"){
            this.setState({
                share_address_toggle: "block"
            });
        }else{
            this.setState({
                share_address_toggle: "none"
            });
        }
    };

    render() {
        const component = this.props.statistics.map( (statistic, index) => {
            return (<div className="component" key={ statistic.id }>
                <div className="navy-section"></div>
                <img className="component__user-img" alt="user" src={ statistic.user_img } />
                <div className="statistics">
                    <img onClick={ this.handleShareClick } className="statistics__share-btn" alt="share" src="/images/share.png" />
                    <div className="statistics__address" style={ { display: this.state.share_address_toggle } }>
                        Copy this address: { this.state.location }
                    </div>
                    <h1 className="statistics__user-name">
                        { statistic.name }
                    </h1>
                    <img src="images/heart.png" onClick={ () => this.handleHeartClick(index) } className="statistics__heart-btn" alt="heart" style={ { display: this.state.unlike_heart } }/>
                    <img src="images/heart-active.png" onClick={ () => this.handleHeartClick(index) } className="statistics__heart-btn" alt="heart" style={{display: this.state.like_heart}} />
                    <h3 className="user-address">
                        { statistic.address }
                    </h3>
                    <div className="statistics-info">
                        <div className="statistics-info__likes">
                            <p className="statistics-info__number">
                                { statistic.likes }
                            </p>
                            <p className="statistics-info__signature">
                                Likes
                            </p>
                        </div>
                        <div className="statistics-info__line">
                        </div>
                        <div className="statistics-info__following">
                            <p className="statistics-info__number">
                                { statistic.following }
                            </p>
                            <p className="statistics-info__signature">
                                Following
                            </p>
                        </div>
                        <div className="statistics-info__line">
                        </div>
                        <div className="statistics-info__followers">
                            <p className="statistics-info__number">
                                { statistic.followers }
                            </p>
                            <p className="statistics-info__signature">
                                Followers
                            </p>
                        </div>
                    </div>
                    <button onClick={ () => this.handleFollowClick(index) } className="btn-style" style={ { background: this.state.follow_btn_color } }>
                        Follow
                    </button>
                </div>
                <CommentsManager />
                <AddComment />
            </div>)
        });
        return (<div>
            { component }
        </div>);
    }
}

function mapStateToProps(state){
    return {
        statistics: state.statistics
    }
}
export default connect(
    mapStateToProps,
    { getStatistics, addLike, subtractLike, addFollow, subtractFollow }
)(StatisticManager);
