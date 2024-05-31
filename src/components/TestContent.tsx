import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Chart } from "react-chartjs-2";
import LineData from "./ChartData";

const TestContent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <main className="mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h4>Dashboard</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-header">
                <span>
                  <i className="bi bi-table me-2"></i>
                </span>{" "}
                Test React Bootstrap
              </div>
              <div className="card-body">
                <Button variant="primary" onClick={handleShow}>
                  Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input type="text" id="name" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                          Age
                        </label>
                        <input
                          type="number"
                          id="age"
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-header">
                <span>
                  <i className="bi bi-table me-2"></i>
                </span>{" "}
                Test React Chart
              </div>
              <div className="card-body">
                <Chart type="line" data={LineData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TestContent;
