import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import chessImg from "../../assets/Chess.png";

const Template2 = ({ title, description, image, sosmeds }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#2791a8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="rounded px-5 py-3 text-dark"
            style={{ backgroundColor: "#6eabb8", width: "30rem" }}
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                src={image}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <h3>{title}</h3>
              <p className="w-50 text-center">{description}</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              {sosmeds.map((sosmed) => (
                <a
                  href={sosmed.url}
                  target="_blank"
                  style={{ border: "2px solid #b2e3ed", borderRadius: "30px" }}
                  className="w-100 bg-white text-dark mb-3 py-3 px-2 text-decoration-none d-flex justify-content-center"
                  key={sosmed.id}
                >
                  {sosmed.title_sosmed}
                </a>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Template2;
