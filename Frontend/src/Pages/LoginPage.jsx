import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const notify = () => toast('Here is your toast.');

  return (
    <div className="flex justify-center items-center h-screen text-amber-600 ">
      <div className="card w-full max-w-md bg-base-100  text-fuchsia-900 overflow-auto shadow-xl backdrop-blur-sm bg-white/35">
        <div className="card-body ">
          <h2 className="card-title">Login</h2>
          <Formik
            initialValues={{ email: '', password: ''}}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string()
                .required('Required')
                .min(8, 'Password must be at least 8 characters long')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/\d/, 'Password must contain at least one number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify({ ...values}, null, 2));
                }, 400);
              }}
          >
            <Form className="space-y-4 ">

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="email" className="text-error" component="div" />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <Field
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="password" className="text-error" component="div" />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;