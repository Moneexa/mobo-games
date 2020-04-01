import React from 'react';
import { Form } from 'react-bootstrap';
import './games-list.css';

export class GamesList extends React.Component {
    render() {
        return (
            <div className="games-list-component">
                <div className="mt-4 mx-3">
                    <Form.Control defaultValue="all" as="select">
                        <option value="all">All Games</option>
                    </Form.Control>
                </div>
                <div className="d-flex flex-wrap space-evenly mb-5">
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                    <div className="column mt-4">
                        <div className="img-container d-flex align-items-center justify-content-center p-4">
                            <img src="/image.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}