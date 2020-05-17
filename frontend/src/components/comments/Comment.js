import React, { Component } from "react";

function Comment({ comment, onDeleteClick }) {
  return (
    <div>
      <p>{"User Name :" + comment.email}</p>
      <p>{comment.body}</p>
      <button className="btn btn-danger btn-sm" onClick={onDeleteClick}>
        Delete comment
      </button>
    </div>
  );
}

export default Comment;
