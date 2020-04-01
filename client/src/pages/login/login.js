import React from 'react';
import { FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export class Login extends React.Component {
    render() {
        return (
            <div className="login-component  d-flex flex-column align-items-center justify-content-center text-center">
                <h4 className="text-center justify-content-center mx-4">
                    Member Login
                </h4>

                <form className="login-form">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon className="prefix-icon" icon={faEnvelope} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>

                        <FormControl as="input" className="input-field" type="email" placeholder="Email address" name="usrnm" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon className="prefix-icon" icon={faAsterisk} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="input" className="input-field" type="password" placeholder="Password" name="usrnm" />
                    </InputGroup>
                    <div className="d-flex justify-content-center my-4">
                        <button type="button" className="btn btn-success btn-block py-2">Login</button>
                    </div>
                </form>

            </div>

        )
    }
}
