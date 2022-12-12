import React from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function Menu() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="p-2" fluid>
        <Navbar.Brand>Books Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/book_record">Book Record</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="mr-2 form-control"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        
      </Container>
    </Navbar>
  );
}
