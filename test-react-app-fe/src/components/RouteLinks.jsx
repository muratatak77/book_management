import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import BookList from "./book/BookList";
import BookRecord from "./book/BookRecord";
import Book from "./book/Book";
import BookEdit from "./book/BookEdit";

// This site have some pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function RouteLinks() {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/book_record" element={<BookRecord />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="/books/:id/edit" element={<BookEdit />} />
    </Routes>
  );
}
