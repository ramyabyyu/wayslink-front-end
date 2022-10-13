import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import chessImg from "../../assets/Chess.png";

const Template1 = ({ title, description, image, sosmeds }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded p-5">
            <div className="d-flex align-items-center justify-content-center flex-column w-100">
              <img
                src={image}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <h3 className="fw-bold mt-3">{title}</h3>
              <p className="w-50 text-center">{description}</p>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column">
              {sosmeds?.map((sosmed) => (
                <>
                  <a
                    href={sosmed.url}
                    target="_blank"
                    className="rounded bg-dark d-flex w-100 py-1 px-2 align-items-center justify-content-start text-decoration-none mb-3"
                    key={sosmed.id}
                  >
                    <img
                      src={sosmed.image}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                    <p
                      className="text-white mt-3"
                      style={{ marginLeft: "18rem" }}
                    >
                      {sosmed.title_sosmed}
                    </p>
                  </a>
                </>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Template1;
