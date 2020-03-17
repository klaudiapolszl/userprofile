import React from 'react';

class CommentsManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            show_comments: "comments-component",
            text_hide_comments: '',
            hide: 0
        }
    }

    componentDidMount(){
        fetch(`http://localhost:4000/comments`)
            .then( r => r.json() )
            .then( ans => {
                let response = this.state.comments.slice();
                response.push(...ans);
                this.setState({
                    comments: response
                });
            });
    }

    handleHideClick = () => {
        if (this.state.hide === 0) {
            this.setState({
                show_comments: "comments-component show_comments",
                hide: 1
            });
        } else{
            this.setState({
                show_comments: "comments-component",
                hide: 0
            });
        }
    };

    render() {
        const list = this.state.comments
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
                            day = 'today';
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
        if (this.state.hide === 0) {
            for (let i = 0; i < 3; i++) {
                list_print[i] = list[i];
            }
        } else {
            list_print = list;
        }

        return(
            <div className={ this.state.show_comments }>
                <p onClick={ this.handleHideClick } className="comments-hide">
                    { (this.state.hide === 0) ? "Show comments (" + (this.state.comments.length - 3) + ")" : "Hide comments" }
                </p>
                { list_print }
            </div>
        )}
}

export default CommentsManager;
