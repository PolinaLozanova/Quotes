import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList: React.FC<{ comments: { id: string; text: string }[] }> = (
  props
) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;