import React from "react";

import "./PostCard.css";

const PostCard = (props) => {
  return (
    <div className="post-card" key={props.post._id}>
      <span className="post-card__title">{props.post.title}</span>
      <span className="post-card__content">{props.post.content}</span>
      <span className="post-card__author">{props.post.author}</span>
      <span className="post-card__date">{props.post.created_at}</span>
      <span className="post-card__date">{props.post.modified_at}</span>
    </div>
  );
};

export default PostCard;
