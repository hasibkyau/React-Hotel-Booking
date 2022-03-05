import React, { Component } from 'react';
import { Formik } from 'formik';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { auth } from '../../redux/authActionCreators';


const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}
class Auth extends Component {
    state = {
        mode: "Login"
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" })
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }

                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }

                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 4) {
                            errors.password = 'Must be atleast 4 characters!';
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'Password field does no match!';
                            }
                        }
                        //console.log("Errors:", errors)
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div className='container col-12 col-lg-6' style={{
                            border: "1px grey solid",
                            padding: "15px",
                            borderRadius: "7px",
                        }}>
                            <button style={{
                                    width: "100%",
                                    //backgroundColor: "#81B441",
                                    color: "white",
                                }} className="btn btn-primary" onClick={this.switchModeHandler}>{this.state.mode === "Sign Up" ? "Already have an account?" : "Create New Account ?"}</button>
                                <br />
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.email}</span>
                                <br />
                                <input
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.password}</span>
                                <br />

                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        name="passwordConfirm"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                    />
                                    <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
                                    <br />
                                </div> : null}

                                <Button style={{ width: "100%" }} type="submit" className="btn btn-success">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</Button>
                                {this.state.mode === "Sign Up" ? <hr /> : <p>Forgot Password?</p>}                                
                            </form>
                        </div>)}
                </Formik>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Auth);