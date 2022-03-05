import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "../../redux/baseUrl";
import { Alert } from "reactstrap";
import { Formik } from 'formik';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Booking extends Component {
    state = {
        alertShow: false,
        alertText: null,
        alertType: null
    }

    render() {
        console.log(this.props);
        return (
            <div className="container" style={{ paddingLeft: "20px", textAlign: "left" }}>
                <Formik initialValues={
                    {
                        firstname: "",
                        lastname: "",
                        telnum: "",
                        email: "",
                        agree: false,
                        contactType: "",
                        message: "",
                    }
                }

                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                        axios.post(baseUrl + "feedback", values)
                            .then(response => response.status)
                    }}
                >

                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                        <Form className="container col-12 col-lg-6" onSubmit={handleSubmit}>
                            <h3>Send us your Feedback</h3><br />
                            <FormGroup>
                                <Label>firstname</Label>
                                <Input
                                    type="text"
                                    name="firstname"
                                    onChange={handleChange}
                                    value={values.firstname} />
                            </FormGroup>

                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name="lastname"
                                    onChange={handleChange}
                                    value={values.lastname}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Contact</Label>
                                <Input
                                    type="number"
                                    name="telnum"
                                    onChange={handleChange}
                                    value={values.telnum}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Your Feedback</Label>
                                <Input
                                    type="textarea"
                                    name="message"
                                    onChange={handleChange}
                                    value={values.message}
                                />
                            </FormGroup>

                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Booking;