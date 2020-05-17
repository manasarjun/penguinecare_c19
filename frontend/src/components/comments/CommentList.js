import React, { Component } from "react";

import CommentsApi from "./../../api/CommentsApi";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  async createComment(commentData) {
    try {
      const post = { id: this.props.post.id, body: this.props.post.body };
      const response = await CommentsApi.createComment({
        body: commentData.body,
        email: this.props.mail,
        post,
      });
      const comment = response.data;
      const newComments = this.state.comments.concat(comment);

      this.setState({
        comments: newComments,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async deleteComment(comment) {
    try {
      await CommentsApi.deleteComment(comment.id);
      const newComments = this.state.comments.filter(
        (c) => c.id !== comment.id
      );
      this.setState({
        comments: newComments,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async updateComment(commentData) {
    try {
      const post = {
        id: this.props.post.id,
        body: this.props.post.body,
        email: this.props.post.email,
      };
      const response = await CommentsApi.updateComment({
        id: commentData.id,
        body: commentData.body,
        email: commentData.email,
        post,
      });
      const comment = response.data;
      const newComments = this.state.comments
        .filter((c) => c.id !== comment.id)
        .concat(commentData);
      this.setState({
        comments: newComments,
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    const postId = this.props.post.id;
    CommentsApi.getAllCommentsByPostId(postId)
      .then(({ data }) => {
        console.log(data);
        this.setState({ comments: data });
      })
      .catch((err) => console.error(err.response.data));
  }

  render() {
    const comments = this.state.comments;
    return (
      <div>
        <CommentForm
          onSubmit={(commentData) => this.createComment(commentData)}
        />
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            activeMail={this.props.mail}
            onDeleteClick={() => this.deleteComment(comment)}
            onHandleEdit={(commentData) => this.updateComment(commentData)}
          />
        ))}
      </div>
    );
  }
}

export default CommentList;
