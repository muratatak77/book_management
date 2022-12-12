import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ClipLoader from "react-spinners/ClipLoader";

function BookEdit() {
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState({});
  const [title, setTitle] = useState();
  const [pageSize, setPageSize] = useState("");
  const [error, setError] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [validated, setValidated] = useState(false);

  const onCategorySelect = (e) => {
    setSelectCategory(e);
  };

  const updateBook = (data) => {
    setBook(data);
    setTitle(data.title);
    setPageSize(data.page_size);
    setSelectCategory(data.category);
  };

  useEffect(() => {
    loadBookAndCategories.current();
  }, []);

  const loadBookAndCategories = useRef(() => {
    const headers = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const urls = [
      "http://localhost:3000/books/" + bookId,
      "http://localhost:3000/categories",
    ];
    Promise.all([fetch(urls[0]), fetch(urls[1])])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        setCategoryOptions(data[1]);
        updateBook(data[0]);
        setIsFetched(true);
      })
      .catch(function (error) {
        console.log("error :", error);
      });
  });

  const submit = (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Prevents loading browser again. https://www.robinwieruch.de/react-preventdefault/
      e.preventDefault();
      let data = {
        title: title,
        page_size: pageSize,
        category: selectCategory.value,
      };
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        body: JSON.stringify(data),
      };
      fetch("http://localhost:3000/books/" + bookId, requestOptions)
        .then((response) => response.json())
        .then(
          (result) => {
            updateBook(result);
            setIsFetched(true);
            alert("Update successfully!");
          },
          (error) => {
            setError(error);
          }
        );
    }
    setValidated(true);
  };

  const showForm = (
    <Form
      noValidate
      validated={validated}
      onSubmit={submit}
      className="col-md-5"
    >
      <Form.Group className="mb-3">
        <Form.Label>Book Title:</Form.Label>
        <Form.Control
          type="text"
          required
          minLength={3}
          maxLength={50}
          defaultValue={book.title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide at least 3 letters!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Page Size:</Form.Label>
        <Form.Control
          required
          type="number"
          min="10"
          defaultValue={book.page_size}
          name="pageSize"
          onChange={(e) => setPageSize(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide at least 10 page!
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Label>Category:</Form.Label>
      <Form.Group className="mb-3">
        <Select
          onChange={onCategorySelect}
          defaultValue={categoryOptions.filter(function (option) {
            return option.value === book.category;
          })}
          options={categoryOptions}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );

  return (
    <div className="d-flex justify-content-center px-0 mx-0">
      {!isFetched ? <ClipLoader color={"#ccc"} size={150} /> : showForm}
    </div>
  );

}

export default BookEdit;
