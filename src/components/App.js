import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import BookDisplay from "./BookDisplay";
import Search from "./Search";

//const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours
const demo_url = `https://openlibrary.org/search.json?q="one+day+in+the+life"`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(demo_url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setBooks(jsonResponse.docs);
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    //console.log("search", movies); //TESTING
    let book_url = "https://openlibrary.org/search.json?q=" + searchValue;
    //`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`
    fetch(book_url)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log("searchValue", searchValue);
        console.log(book_url);
        console.log(jsonResponse.numFound);
        if (jsonResponse.numFound > 500) {
          //too many responses
          setErrorMessage(
            "Too many responses - please narrow down search terms"
          );
          setLoading(false);
        } else if (jsonResponse.numFound > 0) {
          //if less than 500 but more than 0
          setBooks(jsonResponse.docs);
          setLoading(false);
        } else {
          setErrorMessage("Invalid Query");
          setLoading(false);
        }
      });
  };

  //not sure why refreshpage is not working
  const refreshPage = () => {
    window.location.reload();
    console.log("running");
  };

  console.log(books);
  //multiple ternery operators
  return (
    <div className="App">
      <Header text="HOOKED" onClick={refreshPage} />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite books</p>
      <div className="books">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          books.map((el, index) => (
            <BookDisplay key={`${index}-${el.title}`} book={el} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
