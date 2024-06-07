import React from "react";
import { MDBCardBody, MDBIcon } from "mdb-react-ui-kit";

const Resposta = ({ text }) => {
    return (
        <>
            <MDBCardBody>
                <div>
                    <a className="me-3" href="#">
                        <img
                            className="rounded-circle shadow-1-strong me-3"
                            src="https://avatar.iran.liara.run/public/38"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                    </a>

                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                                Simona Disa
                                <span className="small"> - 11/12/13</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                {text}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                    <MDBIcon fas icon="thumbs-up me-1" />
                                    23
                                </a>
                                <a href="#!" className="link-muted">
                                    <MDBIcon fas icon="thumbs-down me-1" />
                                    8
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </MDBCardBody>
        </>
    )
}

export default Resposta