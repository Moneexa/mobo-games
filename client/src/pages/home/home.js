import React from 'react';
import './home.css'
import { Link } from "react-router-dom";
export class Home extends React.Component {
    render() {
        return (
            <div className="home-component">
                <div className="home_sec_1">
                    <h4>Access Over 1,000 Games!</h4>
                    <p className="text-center justify-content-center mx-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit vulputate.
                    </p>
                    <Link to="/signup" type="button" className="btn btn-success px-5 py-2 push-end">Start your free trial </Link>

                </div>
                <div className="home_sec_2">
                    <h4>Sample headline text. </h4>
                    <p className="text-center mx-4 my-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit vulputate.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit vulputate.
                    </p>
                    <Link to="/signup" type="button" className="btn btn-success px-5 py-2 mt-4">Start your free trial </Link>
                </div>
                <div className="home_sec_3"></div>
                <div className="d-flex justify-content-center">
                    <Link to="/signup" type="button" className="btn btn-success px-5 py-2 my-4">Start your free trial</Link>
                </div>
            </div>
        )
    }
}
