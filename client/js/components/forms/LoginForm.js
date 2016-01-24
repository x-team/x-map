import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import ErrorList from '../forms/ErrorList';

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: this.props.email || '',
      password: this.props.password || ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, onSuccess } = this.props;
    onSubmit(this.state.email, this.state.password, onSuccess);
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {

    const { errors } = this.props;

    return (
      <div>
        <ErrorList errors={errors}/>
        <form id="loginForm" onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <Input type="email" placeholder="Email" addonBefore="@" onChange={this.onEmailChange.bind(this)} required/>
          </div>
          <div className="row">
            <Input type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} required/>
          </div>
          <div className="row">
            <Button className="col-md-4 col-md-push-4 btn btn-success btn-sm" type="submit">Login</Button>
          </div>
        </form>
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