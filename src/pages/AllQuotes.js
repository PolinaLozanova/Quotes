import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/hooks/use-http";
import { getAllQuotes } from "../lib/lib/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { useHistory, useLocation } from "react-router-dom";

import { DragDropContext } from "react-beautiful-dnd";

const AllQuotes = () => {
  const [quotesOrder, setQuotesOrder] = useState([]);
  const [quotesData, setQuotesData] = useState({});

  const history = useHistory();
  const location = useLocation();

  const {
    sendRequest,
    status,
    data: fetchQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (!fetchQuotes) {
      return;
    }
    setQuotesOrder(fetchQuotes.map((item) => item.id));
    const data = {};
    fetchQuotes.forEach((item) => {
      data[item.id] = { author: item.author, text: item.text };
    });

    setQuotesData(data);
  }, [fetchQuotes]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!quotesOrder || quotesOrder.length === 0)) {
    return <NoQuotesFound />;
  }

  const dragStartHandler = () => {
    history.replace({
      pathname: location.pathname,
      search: "",
    });
  };

  const dragEndHandler = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = Array.from(quotesOrder);
    //console.log("items begin", JSON.stringify(items));

    const [item] = items.splice(source.index, 1);

    items.splice(destination.index, 0, item);
    // console.log("source.index", source.index);
    // console.log("destination.index", destination.index);

    setQuotesOrder((prevState) => {
      // console.log("prevState", JSON.stringify(prevState));
      // console.log("items newState", JSON.stringify(items));
      return items;
    });
  };

  return (
    <DragDropContext onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
      <QuoteList quotesOrder={quotesOrder} quotesData={quotesData} />
    </DragDropContext>
  );
};

export default AllQuotes;
