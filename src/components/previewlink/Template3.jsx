import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import chessImg from "../../assets/Chess.png";

const Template3 = ({ title, description, image, sosmeds }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#bf5c00",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="rounded" style={{ width: "30rem" }}>
            <div className="d-flex justify-content-center">
              <img
                src={image}
                width={400}
                height={300}
                style={{ objectFit: "cover" }}
                className="mb-3"
              />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3>{title}</h3>
              <p className="w-50 text-center">{description}</p>

              <div className="d-flex my-5">
                {sosmeds.map((sosmed) => (
                  <a
                    href={sosmed.url}
                    target="_blank"
                    className="text-decoration-none me-3"
                  >
                    <img
                      src={sosmed.image}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Template3;
