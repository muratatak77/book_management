import React from "react";
const Book = ({ book }) => {
  return (
    <div>
      <div className="book">
        <p>{book.id} - {book.title} - {book.page_size} - {book.category}</p>
      </div>
    </div>
  );
};

export default Book;