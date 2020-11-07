import React, {useState} from 'react'
import { Form, FormGroup, Label, Input,Button,  Row, Col } from 'reactstrap';
import './index.css'
import { useFormik } from 'formik'
import Auth from './auth'
import { useHistory } from 'react-router-dom'
// import {useSelector, useDispatch} from 'react-redux'



export default function Login() {

    let [flash, setFlash] = useState('')
    let history = useHistory()
    // let dispatch = useDispatch()

    const validate = values => {


    const errors = {}
        // username validation
        if (values.username=== "") {
            errors.username = "Required!"
        }
        // password validation
        if (!values.password) {
            errors.password ="Required!"
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {

            try {

                let user = await Auth.login(values);
                console.log(user)
                // dispatch({type:"STORE_USER", user})
                history.push('/')

            } catch (e) {
                setFlash(flash=>'Invalid Credintials')
                console.log(flash)
            }

        }

    })

    return (

        <div className="form-div">
        <h3>Login Form</h3>
        <Form  className="form" onSubmit={formik.handleSubmit}>
            <Row>
                <Col>
                    <FormGroup className= "form-group">
                        <Label className="ml-1" htmlFor="username">Username:</Label>
                        <Input
                        type="text"
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
                <Button type="submit" className="li-btn">Login</Button>
            </Form>
            {/* {flash.length  && <strong className="flash">{flash}</strong>} */}

        </div>
    )

}