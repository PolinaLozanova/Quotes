import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

import { Droppable } from "react-beautiful-dnd";

const QuoteList = (props) => {
  const { quotesData, sorted } = props;

  return (
    <Droppable droppableId={"1"}>
      {(provided) => (
        <ul
          className={classes.list}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {sorted.map((id, index) => (
            <QuoteItem
              key={id}
              id={id}
              author={quotesData[id].author}
              text={quotesData[id].text}
              index={index}
            >
              {provided.placeholder}
            </QuoteItem>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default QuoteList;
