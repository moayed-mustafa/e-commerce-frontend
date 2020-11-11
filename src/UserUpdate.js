import React, {useState, useContext} from 'react'
import { useFormik } from 'formik'
import { Form, FormGroup, Label, Input,Button, Row, Col } from 'reactstrap';
import './index.css'
import ServerApi from './API/server'
import { useHistory } from 'react-router-dom'
import userContext from './userContext'
import {Alert} from 'reactstrap'


export default function UpdateUser() {

    const history = useHistory()
    const { current_user, set_current_user } = useContext(userContext)

    const {username, _token} = current_user


    const [flash, setFlash] = useState({condition:false, message:"", backgroundColor: "", color:""})

    const validate = values => {
        const errors = {}
        // username validation
        if (values.username.length > 18) {
            errors.username = 'Must be 18 characters or less';
          }else if (values.username.length < 4) {
            errors.username = 'Must be 4 characters or more';
        }
        // password validation
        if (!values.password) {
            errors.password = "Required!"

        }else if (values.password.length <6) {
            errors.password ='Must be 6 charachters or more'
        }

        // firstname validation
        if (values.first_name) {
            if ( values.first_name.length > 12) {
                errors.first_name = 'Must be 12 characters or less';
              }else if (values.first_name.length < 2) {
                errors.first_name = 'Must be 2 characters or more';
            }

        }
        // lastname validation
        if (values.last_name) {
            if (values.last_name.length > 12) {
               errors.last_name = 'Must be 12 characters or less';
             }else if (values.last_name.length < 2) {
               errors.last_name = 'Must be 2 characters or more';
           }

        }

        // email validation
        if (values.email) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
               errors.email = 'Invalid email address';
             }
        }

        return errors;

    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            email: "",
            address:""
        },
        validate,
         onSubmit: async(values) => {


            try {

                values._token = _token;
                await ServerApi.updateUser(values, username)
                flashControl("User data updated successfuly, you will be redirected to log in soon",
                "#FFB500","#283350")

                setTimeout(() => {
                    set_current_user()
                    history.push('/login')
                }, 3000)

            } catch (e) {
                flashControl(e.message,"#F93800","#FFB500")
            }
        }
    })

    function flashControl(message, backgroundColor, color) {
        setFlash(data =>data = {
            condition: true,
            message ,
            backgroundColor,
             color

            })

    }

    return (
        <div className="form-div">

        <h3>Update user</h3>
        <Form  className="form" onSubmit={formik.handleSubmit}>
            <Row>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="username">Username:</Label>
                            <Input type="text"
                                className="username"
                                name="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                />
                                {formik.touched.username && formik.errors.username ?
                                <div className="error">{formik.errors.username}</div>
                                : null}
                     </FormGroup>

                </Col>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="password">Password:</Label>
                        <Input
                        type="password"
                        className="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div className="error">{formik.errors.password}</div>
                                : null}
                    </FormGroup>
                </Col>

            </Row>

            <Row>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="first_name">First name:</Label>
                        <Input
                        type="text"
                        className="first_name"
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        onBlur={formik.handleBlur}
                            />
                            {formik.touched.first_name && formik.errors.first_name ?
                                <div className="error">{formik.errors.first_name}</div>
                                : null}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="last_name">Last name:</Label>
                        <Input
                        type="text"
                        className="last_name"
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        onBlur={formik.handleBlur}
                            />
                            {formik.touched.last_name&& formik.errors.last_name ?
                                <div className="error">{formik.errors.last_name}</div>
                                : null}
                    </FormGroup>

                </Col>

            </Row>
            <Row>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="email">Email:</Label>
                        <Input
                        type="email"
                        className="email"
                         name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                            />
                            {formik.touched.email&& formik.errors.email ?
                                <div className="error">{formik.errors.email}</div>
                                : null}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="address">Address:</Label>
                        <Input
                        type="text"
                        className="address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                            />
                            {formik.touched.address&& formik.errors.address ?
                                <div className="error">{formik.errors.address}</div>
                                : null}
                    </FormGroup>

                </Col>
            </Row>
                <Button type="submit"className="li-btn">Update</Button>
            </Form>
            {flash.condition && <Alert style={{backgroundColor:flash.backgroundColor, color:flash.color}}>{flash.message} </Alert>}

        </div>
    )

}