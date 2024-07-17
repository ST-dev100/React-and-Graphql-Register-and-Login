// App.jsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import SignUp from './Pages/SignUp';
import Login from './Pages/LoginPage';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignUpInput!) {
    signup(input: $input) {
      id
      username
      image
    }
  }
`;

function App() {
  const [username, setUsername] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [signup] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await signup({
        variables: {
          input: {
            username,
            imageFile: imageFile,
          },
        },
      });
  
      console.log('Signup successful:', data.signup);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  return (
    <div className=' flex justify-center items-center flex-col gap-2 pt-6 '>
        
      {/* <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          
        </label>
        <br/>
        <l6abel>
          Image:
          <input type="file" onChange={handleImageChange} />
        </l6abel>
        <br />
        <button type="submit">Sign Up</button>
      </form> */}   
        {/* <SignUp/> */}
        <Login/>
    </div>
  );
}

export default App;