import React, { Component, PropTypes } from 'react';
import ErrorList from '../forms/ErrorList';

class ProfileForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.user;
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
      <div>
        <ErrorList errors={errors} showFieldErrors/>
        <h3>Edit profile #{this.state.id}</h3>
        <form id="profileEditForm" onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <input type="email" placeholder="Email" value={this.state.email} onChange={this.onInputChange.bind(this, 'email')} required/>
          </div>
          <div className="row">
            <input type="text" placeholder="First name" value={this.state.firstName} onChange={this.onInputChange.bind(this, 'firstName')} required/>
          </div>
          <div className="row">
            <input type="text" placeholder="Last name" value={this.state.lastName} onChange={this.onInputChange.bind(this, 'lastName')} required/>
          </div>
          <div className="row">
            <input type="text" placeholder="Skype ID" value={this.state.skypeId} onChange={this.onInputChange.bind(this, 'skypeId')}/>
          </div>
          <div className="row">
            <input type="text" placeholder="Slack ID" value={this.state.slackId} onChange={this.onInputChange.bind(this, 'slackId')}/>
          </div>
          <div className="row">
            <input type="text" placeholder="Website" value={this.state.website} onChange={this.onInputChange.bind(this, 'website')}/>
          </div>
          <div className="row">
            <input type="text" placeholder="Nationality" value={this.state.nationality} onChange={this.onInputChange.bind(this, 'nationality')}/>
          </div>
          <div className="row">
            <textarea placeholder="About me" value={this.state.aboutMe} onChange={this.onInputChange.bind(this, 'aboutMe')}/>
          </div>
          <div className="row">
            <button className="button" type="submit">Save</button>
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
  }).isRequired
};

export default ProfileForm;
