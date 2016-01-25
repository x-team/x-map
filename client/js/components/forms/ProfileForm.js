import React, { Component, PropTypes } from 'react';
import { Button, Input } from 'react-bootstrap';
import ErrorList from '../forms/ErrorList';

class ProfileForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.user;
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, onSuccess } = this.props;
    onSubmit(this.state.id, this.state, onSuccess);
  }

  onStateChange(field, e) {
    let change = {};
    change[field] = e.target.value;

    this.setState(change);
  }

  render() {

    const { errors, user } = this.props;

    return (
      <div>
        <ErrorList errors={errors} showFieldErrors={true}/>
        <h3>Edit profile #{this.state.id}</h3>
        <form id="profileEditForm" onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <Input type="email" placeholder="Email" value={this.state.email} addonBefore="@" onChange={this.onStateChange.bind(this, 'email')} required/>
          </div>
          <div className="row">
            <Input type="text" placeholder="First name" value={this.state.firstName}  onChange={this.onStateChange.bind(this, 'firstName')} required/>
          </div>
          <div className="row">
            <Input type="text" placeholder="Last name" value={this.state.lastName}  onChange={this.onStateChange.bind(this, 'lastName')} required/>
          </div>
          <div className="row">
            <Input type="text" placeholder="Skype ID" value={this.state.skypeId}  onChange={this.onStateChange.bind(this, 'skypeId')} required/>
          </div>
          <div className="row">
            <Input type="text" placeholder="Slack ID" value={this.state.slackId}  onChange={this.onStateChange.bind(this, 'slackId')} required/>
          </div>
          <div className="row">
            <Input type="text" placeholder="Website" value={this.state.website}  onChange={this.onStateChange.bind(this, 'website')} required/>
          </div>
          <div className="row">
            <Input type="text" placeholder="Nationality" value={this.state.nationality}  onChange={this.onStateChange.bind(this, 'nationality')} required/>
          </div>
          <div className="row">
            <Input type="textarea" placeholder="About me" value={this.state.aboutMe}  onChange={this.onStateChange.bind(this, 'aboutMe')} required/>
          </div>
          <div className="row">
            <Button className="col-md-4 col-md-push-4 btn btn-success btn-sm" type="submit">Update profile</Button>
          </div>
        </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  errors: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

export default ProfileForm;