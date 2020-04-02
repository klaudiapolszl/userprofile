import React from "react";
import CommentsManager from "./CommentsManager.jsx";
import AddComment from "./AddComment.jsx";
import { connect } from "react-redux";
import getStatistics, { addLike, subtractLike, addFollow, subtractFollow } from "../services/userServices.js";

class StatisticManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            follow: false,
            share_address_show: false,
        }
    }

    componentDidMount() {
        this.props.getStatistics();
    }

    handleHeartClick = (id) => {
        if(this.state.like) {
            this.props.subtractLike(this.props.statistics, id);
            this.setState({
                like: false
            });
        } else {
            this.props.addLike(this.props.statistics, id);
            this.setState({
                like: true
            });
        }
    };

    handleFollowClick = (id) => {
        if(this.state.follow) {
            this.props.subtractFollow(this.props.statistics, id);
            this.setState({
                follow: false
            });
        } else {
            this.props.addFollow(this.props.statistics, id);
            this.setState({
                follow: true
            });
        }
    };

    handleShareClick = () => {
        if(this.state.share_address_show){
            this.setState({
                share_address_show: false
            });
        }else{
            this.setState({
                share_address_show: true
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
                    <div className={ (this.state.share_address_show) ? "statistics__address" : "statistics__address statistics__address--hide" }>
                        Copy this address: { window.location.href }
                    </div>
                    <h1 className="statistics__user-name">
                        { statistic.name }
                    </h1>
                    <img src="images/heart.png" onClick={ () => this.handleHeartClick(index) } className={ (this.state.like) ? "statistics__hide-heart" : "statistics__heart-btn" } alt="heart" />
                    <img src="images/heart-active.png" onClick={ () => this.handleHeartClick(index) } className={ (this.state.like) ? "statistics__heart-btn" : "statistics__hide-heart" } alt="heart" />
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
                    <button onClick={ () => this.handleFollowClick(index) } className={ (this.state.follow) ? "btn-style btn-style--active" : "btn-style" } >
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

function mapStateToProps(state) {
    return {
        statistics: state.statistics
    }
}

export default connect(
    mapStateToProps,
    { getStatistics, addLike, subtractLike, addFollow, subtractFollow }
)(StatisticManager);
