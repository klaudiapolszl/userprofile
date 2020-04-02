import React from "react";
import { connect } from "react-redux";
import { getComments } from "../services/userServices.js";

class CommentsManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hide_comments: true
        }
    }

    componentDidMount(){
        this.props.getComments();
    }

    handleHideClick = () => {
        if (this.state.hide_comments) {
            this.setState({
                hide_comments: false
            });
        } else{
            this.setState({
                hide_comments: true
            });
        }
    };

    render() {
        const list = this.props.comments
            .sort(function(obj1, obj2){
                let data1 = new Date(obj1.date);
                let data2 = new Date(obj2.date);
                if ((data1 - data2) > 0){
                    return -1;
                }
                else if ((data1 - data2) < 0) {
                    return 1;
                } else {
                    return 0;
                }
            })
            .map( comment => {
                let now = new Date();
                let last = new Date(comment.date);
                let day = new Date();
                if (now.getYear() === last.getYear()) {
                    if (now.getMonth() === last.getMonth()) {
                        if (now.getDate() === last.getDate()) {
                            day = "today";
                        } else {
                            day = now.getDate() - last.getDate() + "D";
                        }
                    } else {
                        day = now.getMonth() - last.getMonth() + "M";
                    }
                }else{
                    day = now.getYear() - last.getYear() + "Y";
                }

                return <div className="comment" key={ comment.id }>
                    <img className="comment__img" src={ comment.image } alt="user" />
                    <p className="comment__name">
                        { comment.name }
                    </p>
                    <p className="comment__date">
                        { day }
                    </p>
                    <p className="comment__content">
                        { comment.content }
                    </p>
                    <hr className="comment__line" />
                </div>
            });

        let list_print=[];
        if (this.state.hide_comments) {
            for (let i = 0; i < 3; i++) {
                list_print[i] = list[i];
            }
        } else {
            list_print = list;
        }

        return(
            <div className={ (this.state.hide_comments) ? "comments-component show_comments" : "comments-component" }>
                <p onClick={ this.handleHideClick } className="comments-hide">
                    { (this.state.hide_comments) ? "Show comments (" + (this.props.comments.length - 3) + ")" : "Hide comments" }
                </p>
                { list_print }
            </div>
        )}
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

export default connect(
    mapStateToProps,
    { getComments }
)(CommentsManager);
