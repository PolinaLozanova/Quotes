import React, { useRef, useEffect } from "react";

import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/hooks/use-http-redux";
import { addComment } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { ADD_COMMENT } from "../../store";

const NewCommentForm: React.FC<{
  onAddedComment: () => void;
  quoteId: string;
}> = (props) => {
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  const { sendRequest, status, error } = useHttp(addComment, ADD_COMMENT);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [onAddedComment, status, error]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = commentTextRef.current!.value;
    // optional: Could validate here

    sendRequest({
      commentData: { text: enteredText },
      quoteId: props.quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows={5} ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
