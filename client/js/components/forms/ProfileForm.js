import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/* Components */
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
      <div id="ProfileForm">
        <ErrorList errors={errors} showFieldErrors/>
        <form onSubmit={this.onSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="First name" value={this.state.firstName}
              onChange={this.onInputChange.bind(this, 'firstName')} maxLength="64" required/>
            <small className="text-muted"><strong>Required.</strong></small>
          </fieldset>

          <fieldset className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" value={this.state.lastName}
              onChange={this.onInputChange.bind(this, 'lastName')} maxLength="64" required/>
            <small className="text-muted"><strong>Required.</strong></small>
          </fieldset>

          <fieldset className="form-group">
            <label>Slack ID</label>
            <input type="text" className="form-control" placeholder="Slack ID" value={this.state.slackId}
              onChange={this.onInputChange.bind(this, 'slackId')} maxLength="64" required/>
            <small className="text-muted"><strong>Required.</strong></small>
          </fieldset>

          <fieldset className="form-group">
            <label>Skype ID</label>
            <input type="text" className="form-control" placeholder="Skype ID" value={this.state.skypeId}
              onChange={this.onInputChange.bind(this, 'skypeId')} maxLength="64"/>
          </fieldset>

          <fieldset className="form-group">
            <label>Website</label>
            <input type="text" className="form-control" placeholder="Website" value={this.state.website}
              onChange={this.onInputChange.bind(this, 'website')}/>
          </fieldset>

          <fieldset className="form-group">
            <label>Nationality</label>
            <input type="text" className="form-control" placeholder="Nationality" value={this.state.nationality}
              onChange={this.onInputChange.bind(this, 'nationality')} maxLength="64"/>
          </fieldset>

          <fieldset className="form-group">
            <label>About me</label>
            <textarea className="form-control" placeholder="About me" value={this.state.aboutMe}
              rows="5" onChange={this.onInputChange.bind(this, 'aboutMe')} maxLength="1024"/>
            <small className="text-muted">Max. length: 1024 characters.</small>
          </fieldset>

          <fieldset className="form-group">
            <button className="btn btn-primary" type="submit">Save</button>
            <span> </span>
            <Link className="btn btn-secondary" to={`/profile/${this.state.id}`}
              title={`${this.state.firstName} ${this.state.lastName}`}>Cancel</Link>
          </fieldset>
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
