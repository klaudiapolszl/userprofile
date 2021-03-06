import React from "react";
import { connect } from "react-redux";
import { addComment } from "../services/userServices";

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Add a comment",
            input_click: false
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
            input_click: true
        });
    };

    handleBtnCommentClick = () => {
        this.props.addComment(this.props.comments, this.state.text);
        this.setState({
            text: ""
        });
        window.location.reload();
    };

    render(){
        return(
            <div className="add-comment">
                <input className="add-comment__input" type="text" value={ this.state.text } onChange={ this.handleInputChange } onClick={ this.handleInputClick } />
                { (this.state.input_click)
                    ? <button className="add-comment__btn btn-style" onClick={ this.handleBtnCommentClick } >
                        Add comment
                      </button>
                    : ""
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

export default connect(
    mapStateToProps,
    { addComment }
)(AddComment);
