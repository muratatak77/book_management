import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BookList = () => {
  const itemsPerPage = 5;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    loadItems.current(1);
  }, []);

  const loadItems = useRef((numberOfPage) => {
    const headers = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    setIsLoaded(false);
    fetch(`http://localhost:3000/books?page=${numberOfPage}`, { headers })
      .then((response) => response.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setCurrentItems(result.data);
          setPageCount(Math.ceil(result.data_count / itemsPerPage));
        },
        (error) => {
          setError(error);
          setIsLoaded(false);
          console.log(`Error : ${error}`);
        }
      );
  });

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {

    console.log(`User requested page number ${event.selected+1}`);
    loadItems.current(parseInt(event.selected+1));
    setActivePage(event.selected+1)
  };

  const showForm = (
    <Container fluid className="px-0 mx-0">
      <Row>
        <Col>
          <Table striped bordered hover size="md" >
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Page Size</th>
                <th>Category</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length == 0 ? noRecord() : ""}
              {currentItems.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.page_size}</td>
                  <td>{book.category}</td>
                  <td>
                    <Link to={`/books/${book.id}/edit`} state={book.id}>
                      <Button className="btn btn-secondary">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            forcePage={activePage-1}
            subContainerClassName={'pages pagination'}
            activeClassName="active"
          />
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className="d-flex justify-content-center px-0 mx-0">
      {!isLoaded ? <ClipLoader color={"#ccc"} size={150} /> : showForm}
    </div>
  );
};

export default BookList;

function noRecord() {
  return <div className="warning-label">There is no record!</div>;
}
