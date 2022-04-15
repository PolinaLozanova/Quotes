import classes from "./HighlightedQuote.module.css";

const HighlightedQuote: React.FC<{ text: string; author: string }> = (
  props
) => {
  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
