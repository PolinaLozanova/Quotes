import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

import { Droppable } from "react-beautiful-dnd";

const sort = (order, data, ascending) => {
  return order.sort((quoteA, quoteB) => {
    if (ascending) {
      return data[quoteA].author > data[quoteB].author ? 1 : -1;
    } else {
      return data[quoteA].author > data[quoteB].author ? -1 : 1;
    }
  });

  // const sortedIds = sortId(order, data);
  // return sortedIds;
};

const QuoteList = (props) => {
  const { quotesOrder, quotesData } = props;
  const history = useHistory();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  const isSortingAscending = queryParam.get("sort") === "asc";

  let sorted = quotesOrder;

  if (queryParam.get("sort") !== null) {
    sorted = sort(quotesOrder, quotesData, isSortingAscending);
  }

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>

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
    </>
  );
};

export default QuoteList;
