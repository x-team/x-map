import React, { Component, PropTypes } from 'react';
import ErrorList from '../forms/ErrorList';

class RegistrationForm extends Component {
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
    onSubmit(this.state, onSuccess);
  }

  onInputChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  render() {
    const { errors } = this.props;

    return (
      <div id="registrationForm">
        <article>
          <section>
            <h2>Register</h2>
            <ErrorList errors={errors} showFieldErrors/>
            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="email" placeholder="Email" onChange={this.onInputChange.bind(this, 'email')} required/>
              <input type="password" placeholder="Password" onChange={this.onInputChange.bind(this, 'password')} required/>
              <button className="button" type="submit">Register</button>
            </form>
          </section>
        </article>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  errors: PropTypes.object
};

export default RegistrationForm;
