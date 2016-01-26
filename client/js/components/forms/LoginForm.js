import React, { Component, PropTypes } from 'react';
import ErrorList from '../forms/ErrorList';

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, onSuccess } = this.props;
    onSubmit(this.state.email, this.state.password, onSuccess);
  }

  onInputChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  render() {
    const { errors } = this.props;

    return (
      <div id="loginForm">
        <article>
          <section>
            <h2>Login</h2>
            <ErrorList errors={errors} showFieldErrors/>
            <form onSubmit={ this.onSubmit.bind(this) }>
              <input type="email" placeholder="Email" onChange={this.onInputChange.bind(this, 'email')} required/>
              <input type="password" placeholder="Password" onChange={this.onInputChange.bind(this, 'password')} required/>
              <button className="button" type="submit">Login</button>
            </form>
          </section>
        </article>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  errors: PropTypes.object
};

export default LoginForm;
