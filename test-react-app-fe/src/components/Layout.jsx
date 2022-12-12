import React, { Component } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RouteLinks from "./RouteLinks";

class Layaout extends Component {
  render() {
    return (
      <>
        <Container className="px-5" fluid>
          <Row>
            <Col>
              <Menu/>
              <div className="mt-4"></div>
              <RouteLinks  />
            </Col>
          </Row>
          <Row>
            <Col>
              <Footer />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Layaout;
