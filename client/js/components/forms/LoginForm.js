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

  onStateChange(field, e) {
    let change = {};
    change[field] = e.target.value;

    this.setState(change);
  }

  render() {

    const { errors } = this.props;

    return (
      <div id="loginForm">
        <article>
          <section>
            <h2>Login</h2>
            <ErrorList errors={ errors } showFieldErrors={ true } />
            <form onSubmit={ this.onSubmit.bind(this) }>
              <input type="email" placeholder="Email" onChange={ this.onStateChange.bind(this, 'email') } />
              <input type="password" placeholder="Password" onChange={ this.onStateChange.bind(this, 'password') } />
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
