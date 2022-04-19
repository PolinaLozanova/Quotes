import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/hooks/use-http-redux";
import { getAllQuotes } from "../lib/lib/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { useHistory, useLocation } from "react-router-dom";
import classes from "../components/quotes/QuoteList.module.css";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FETCH_ALL } from "../store";

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
  } = useHttp(getAllQuotes, FETCH_ALL);

  useEffect(() => {
    sendRequest(getAllQuotes);
  }, [sendRequest]);

  useEffect(() => {
    if (!fetchQuotes) {
      return;
    }
    setQuotesOrder(fetchQuotes.map((item: { id: string }) => item.id));

    let data: { [key: string]: { author: string; text: string } } = {};
    fetchQuotes.forEach(
      (item: { id: string; author: string; text: string }) => {
        data[item.id] = { author: item.author, text: item.text };
      }
    );

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

  const sort = (
    order: string[],
    data: { [key: string]: { author: string } },
    ascending: boolean
  ) => {
    return order.sort((quoteA: string, quoteB: string) => {
      if (ascending) {
        return data[quoteA].author > data[quoteB].author ? 1 : -1;
      } else {
        return data[quoteA].author > data[quoteB].author ? -1 : 1;
      }
    });
  };

  const queryParam = new URLSearchParams(location.search);
  const isSortingAscending = queryParam.get("sort") === "asc";

  let sorted: string[] = quotesOrder;

  if (queryParam.get("sort") !== null) {
    sorted = sort(quotesOrder, quotesData, isSortingAscending);
  }

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  const dragEndHandler = (result: DropResult) => {
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
    const [item] = items.splice(source.index, 1);
    items.splice(destination.index, 0, item);

    setQuotesOrder(items);

    if (JSON.stringify(quotesOrder) !== JSON.stringify(items)) {
      history.replace({
        pathname: location.pathname,
        search: "",
      });
    }
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <QuoteList quotesData={quotesData} sorted={sorted} />
    </DragDropContext>
  );
};

export default AllQuotes;
