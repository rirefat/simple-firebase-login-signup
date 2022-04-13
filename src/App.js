import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);
function App() {

  const [email, setEmail]=useState('');
  const [pass, setPass]=useState('');
  const [error, setError]=useState('');
  const [registered, setRegistered]=useState(false);

  const handleEmailBlur=event=>{
    setEmail(event.target.value);
    // console.log(email);
  }
  const handlePassBlur=event=>{
    setPass(event.target.value);
    // console.log(pass);
  }

  const handleSubmit =event=>{  

    if(registered){
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
    else{
      createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setEmail(' ');
        setPass(' ');
        console.log(user);
        emainVerification();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
        console.error(error)
      });
    }

    event.preventDefault();
  }

  const handleRegistered = event =>{
    setRegistered(event.target.checked);
  }

  const emainVerification=()=>{
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("email verified");
      });
  }

  const forgetPass=()=>{
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Sent password reset email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }

  return (
    <div className='w-50 m-auto mt-5'>
      <h1 className='text-primary'>Please {registered ? 'Login':'Register'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onBlur={handleEmailBlur} required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onBlur={handlePassBlur} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleRegistered} type="checkbox" label="Already Registered?" className='text-secondary'/>
          <Button variant="link" onClick={forgetPass}>Forget Password?</Button>
        </Form.Group>
        {error ?  <p className='alert alert-danger rounded'>{error}</p> : " "}
        <Button variant="primary" type="submit">
          {registered ? "Login":"Register"}
        </Button>
      </Form>
    </div>
  );
}

export default App;
