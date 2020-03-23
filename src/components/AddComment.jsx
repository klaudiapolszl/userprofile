import React from 'react';
import {connect} from "react-redux";
import {addComment} from "../services/userServices";

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Add a comment',
            add_comment_btn_show: "none"
        }
    }

    handleInputChange = (event) => {
        this.setState({
            text: event.target.value
        });
    };

    handleInputClick = () => {
        this.setState({
            text: "",
            add_comment_btn_show: "block"
        });
    };

    handleBtnCommentClick = () => {
        this.props.addComments(this.props.comments, this.state.text);
        /*
        let now = new Date();
        fetch('http://localhost:4000/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: "images/user.jpg",
                name: "Mike Ross33",
                content: this.state.text,
                date: now.toString()
            })
        });
 */
        this.setState({
            text: ""
        });
        window.location.reload();

    };

    render(){
        return(
            <div className="add-comment">
                <input className="add-comment__input" type="text" value={ this.state.text } onChange={ this.handleInputChange } onClick={ this.handleInputClick } />
                <button className="add-comment__btn btn-style" onClick={ this.handleBtnCommentClick } style={ { display: this.state.add_comment_btn_show } }>
                    Add comment
                </button>
            </div>
        )}
}

function mapStateToProps(state){
    return {
        comments: state.comments
    }
}
export default connect(
    mapStateToProps,
    { addComment }
)(AddComment);
