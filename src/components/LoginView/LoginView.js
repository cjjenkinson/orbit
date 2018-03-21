import React, { Component } from 'react';
import '../../styles/index.css';
import './loginView.css';

const BASE_URL = 'http://private-e7ea5-gionnimontana.apiary-mock.com/';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: true,
      signIn: false,
      signUp: false,
    };
  }

  signUp = async () => {
    const url = `${BASE_URL}/user`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: this.signUpNameInput,
        email: this.signUpEmailInput,
        password: this.signUpPasswordInput,
      },
    });
    const { token } = response.token;
    window.localStorage.setItem('Authorization', `Bearer ${token}`);
  };

  signIn = async () => {
    const url = `${BASE_URL}/sign-in`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: this.signUpEmailInput,
        password: this.signUpPasswordInput,
      },
    });
    const { token } = response.token;
    window.localStorage.setItem('Authorization', `Bearer ${token}`);
  };

  EditorAuth = () => (
    <div className="editor_selector">
      <button onClick={this.toggleSignIn}>Sign In</button>
      <button onClick={this.toggleSignUp}>Sign Up</button>
    </div>
  );

  SignInForm = () => (
    <div className="sign_in">
      <h2>Email</h2>
      <input
        type="text"
        ref={(input) => {
          this.signInEmailInput = input;
        }}
        placeholder="Email"
      />
      <h2>Password</h2>
      <input
        type="password"
        ref={(input) => {
          this.signInPasswordInput = input;
        }}
        placeholder="Password"
      />
      <button onClick={this.signIn}>Sign In</button>
    </div>
  );

  SignUpForm = () => (
    <div className="sign_in">
      <h2>Name</h2>
      <input
        type="text"
        ref={(input) => {
          this.signUpNameInput = input;
        }}
        placeholder="Name"
      />
      <h2>Email</h2>
      <input
        type="text"
        ref={(input) => {
          this.signUpEmailInput = input;
        }}
        placeholder="Email"
      />
      <h2>Password</h2>
      <input
        type="password"
        ref={(input) => {
          this.signUpPasswordInput = input;
        }}
        placeholder="Password"
      />
      <button onClick={this.signUp}>Sign Up</button>
    </div>
  );

  render() {
    return (
      <div className="login-screen">
        {this.state.editor && <this.EditorAuth />}
        {this.state.signIn && <this.SignInForm />}
        {this.state.signUp && <this.SignUpForm />}
      </div>
    );
  }
}

export default LoginView;
