import React from "react";
import { Card, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import ImageMen from "../../../assets/img/men.png";

export default function DetailsUser(){
    return(
        <Row>
            <Col>
            <Card style={{ width: '600px' }} className="shadow">
  <Card.Img variant="top" src={ImageMen} style={{"max-width": "200px"}} roundedCircle/>
  <Card.Body>
    <Card.Title>Jollaaa</Card.Title>
    <Card.Text style={{"color": "#134B8B"}}>
    Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <Row>
  <Col md={6}>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  </Col>
  <Col md={6}>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  </Col>
  </Row>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>            
            </Col>
        </Row>
    )
}