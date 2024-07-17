import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from 'react-hot-toast';

function SignUp() {
    const notify = () => toast('Here is your toast.');
    const [acceptedFiles, setAcceptedFiles] = React.useState([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (files) => {
        setAcceptedFiles(files);
      },
    });
  return (
    <div className="flex justify-center items-center h-screen text-amber-600 ">
      <div className="card w-full max-w-md bg-base-100 h-screen text-fuchsia-900 overflow-auto shadow-xl backdrop-blur-sm bg-white/35">
        <div className="card-body ">
          <h2 className="card-title">Sign Up</h2>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' ,image:null}}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
              lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string()
                .required('Required')
                .min(8, 'Password must be at least 8 characters long')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/\d/, 'Password must contain at least one number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
            image: Yup.mixed().required('Image is required'),  
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify({ ...values, image: acceptedFiles[0] }, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
          >
            <Form className="space-y-4 ">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="firstName" className="text-error" component="div" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="lastName" className="text-error" component="div" />
              </div>

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
              <div {...getRootProps()} className={`form-control w-full border-4 border-dotted border-black `}>
                <label className="label cursor-pointer">
                  <span className="label-text">Drag and drop an image file</span>
                </label>
                <Field name="image" component="input" {...getInputProps()} type="file" />
                <ErrorMessage name="image" render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
              </div>
              {acceptedFiles.length > 0 && (
                <div className="mt-4">
                <h3 className="card-title">Preview:</h3>
                <img src={URL.createObjectURL(acceptedFiles[0])} alt="Preview" className="max-w-xs" />
                </div>
             )}
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUp;