import React, { Component, PropTypes } from 'react';

class ProfileDetails extends Component {
  render() {
    const { user } = this.props;

    return (
      <div id="ProfileDetails" className="accordion list-group-item" role="tablist" aria-multiselectable="true">
        <section className="panel panel-default">
          <header href="#" className="panel-heading list-group-item-heading" role="tab" id="ProfileDetailsHeading">
            <h4 className="panel-title" data-toggle="collapse" data-parent="#ProfileDetails"
              aria-expanded="true" aria-controls="ProfileDetailsCollapse"
              href="#ProfileDetailsCollapse">Details</h4>
          </header>

          <section id="ProfileDetailsCollapse" className="panel-collapse collapse in list-group-item-text"
            role="tabpanel" aria-labelledby="ProfileDetailsHeading">
            <div>
              <label className="input-group">
                <h5 className="input-group-addon">First name</h5>
                <div className="form-control">{user.firstName}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">Last Name</h5>
                <div className="form-control">{user.lastName}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">Email</h5>
                <div className="form-control">{user.email}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">Skype ID</h5>
                <div className="form-control">{user.skypeId}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">Slack ID</h5>
                <div className="form-control">{user.slackId}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">Website</h5>
                <div className="form-control">{user.website}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">Nationality</h5>
                <div className="form-control">{user.nationality}</div>
              </label>
              <label className="input-group">
                <h5 className="input-group-addon">About me</h5>
                <div className="form-control">{user.aboutMe}</div>
              </label>
            </div>
          </section>
        </section>
      </div>
    );
  }
}

ProfileDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileDetails;
