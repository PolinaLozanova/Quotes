import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

function QuoteItem(props: any) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <li
          className={classes.item}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <figure>
            <blockquote>
              <p>{props.text}</p>
            </blockquote>
            <figcaption>{props.author}</figcaption>
          </figure>
          <Link to={`/quotes/${props.id}`} className="btn">
            View Fullscreen
          </Link>
        </li>
      )}
    </Draggable>
  );
}

export default QuoteItem;
