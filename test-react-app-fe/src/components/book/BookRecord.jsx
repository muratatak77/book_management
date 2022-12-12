import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import FormErrors from "./FormErrors";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BookRecord = (props) => {
  const [title, setTitle] = useState("");
  const [pageSize, setPageSize] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [formData, setFormData] = useState({});

  const [formErrors, setFormErrors] = useState({ title: "", pageSize: "" });
  const [titleValid, setTitleValid] = useState(false);
  const [pageSizeValid, setPageSizeValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [validated, setValidated] = useState(false);

  const client = axios.create({
    baseURL: "http://localhost:3000",
  });
  axios.defaults.headers.common["Content-Type"] = "application/json";

  useEffect(() => {
    loadCategories.current();
  }, []);

  const loadCategories = useRef(async () => {
    try {
      setIsLoading(true);
      let res = await client.get("/categories");
      setCategories(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  });

  const addBook = async (data) => {
    try {
      await client.post("/books", data);
      setIsLoading(false);
      window.location.href = "/books";
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const submit = (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setIsLoading(true);
      e.preventDefault();
      console.log(formData);
      let data = {
        title: title,
        page_size: pageSize,
        category: selectCategory.value,
      };
      addBook(data);
    }
    setValidated(true);
  };

  const onCategorySelect = (e) => {
    setSelectCategory(e);
  };

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let methodName = "set" + capitalize(name);
    eval(methodName)(value);
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let titleValidP = titleValid;
    let pageSizeValidP = pageSizeValid;

    console.log(value);

    switch (fieldName) {
      case "title":
        titleValidP = value.length >= 3;
        fieldValidationErrors.title = titleValidP
          ? ""
          : "Title is invalid. At least 3 letters.";
        break;
      case "pageSize":
        pageSizeValidP = value.length > 0;
        fieldValidationErrors.pageSize = pageSizeValidP ? "" : " is invalid";
        break;
      default:
        break;
    }

    setFormErrors(fieldValidationErrors);
    setTitleValid(titleValidP);
    setPageSizeValid(pageSizeValidP);
    let formValid = titleValidP && pageSizeValidP;
    setFormValid(formValid);
  };

  const errorClass = (error) => {
    if (error && error.length > 0) {
      return (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      );
    }
  };

  const showForm = (
    <Form
      noValidate
      validated={validated}
      onSubmit={submit}
      className="col-md-5"
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Book Title</Form.Label>
        <Form.Control
          required
          minLength={3}
          maxLength={50}
          type="text"
          name="title"
          placeholder="Enter Book Title "
          onChange={(e) => onInputChange(e)}
        />
        {errorClass(formErrors.title)}
      </Form.Group>

      <Form.Group className="mb-3" controlId="validationCustom05">
        <Form.Label className="pt-3">Page Size</Form.Label>
        <Form.Control
          required
          type="number"
          min="10"
          name="pageSize"
          placeholder="Enter Book Total Page Size"
          onChange={(e) => onInputChange(e)}
        />
        <Form.Control.Feedback type="invalid">
          Please provide at least 10 page!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Book Category</Form.Label>
        <Select onChange={onCategorySelect} options={categories} />
      </Form.Group>

      <Button variant="primary" type="submit">
        {/* <Button variant="primary" type="submit" disabled={!formValid} > */}
        Submit
      </Button>
    </Form>
  );

  return (
    <div className="d-flex justify-content-center px-0 mx-0">
      {isLoading ? <ClipLoader color={"#ccc"} size={150} /> : showForm}
    </div>
  );
};

function capitalize(s) {
  if (s) return s.charAt(0).toUpperCase() + s.slice(1);
}
export default BookRecord;
