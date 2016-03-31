import React, { Component, PropTypes } from 'react';

class ProfileDetails extends Component {
  render() {
    const { user } = this.props;

    return (
      <div id="ProfileDetails" className="accordion" role="tablist" aria-multiselectable="true">
        <header href="#" className="accordion-header" role="tab" id="ProfileDetailsHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#ProfileDetails"
            aria-expanded="true" aria-controls="ProfileDetailsCollapse"
            href="#ProfileDetailsCollapse">Details</h3>
        </header>

        <div id="ProfileDetailsCollapse" className="collapse in accordion-body"
          role="tabpanel" aria-labelledby="ProfileDetailsHeading">
          <section className="list-group-item">
            <h4 className="list-group-item-heading">First name</h4>
            <p className="list-group-item-text">{user.firstName}</p>
          </section>

          <section className="list-group-item">
            <h4 className="list-group-item-heading">Last Name</h4>
            <p className="list-group-item-text">{user.lastName}</p>
          </section>

          <section className="list-group-item">
            <h4 className="list-group-item-heading">Email</h4>
            <p className="list-group-item-text"><a href={`mailto:${user.email}`} target="_blank">{user.email}</a></p>
          </section>

          {(() => {
            if (user.skypeId) {
              return (
                <section className="list-group-item">
                  <h4 className="list-group-item-heading">Skype ID</h4>
                  <p className="list-group-item-text">{user.skypeId}</p>
                </section>
              );
            }
          })()}

          {(() => {
            if (user.slackId) {
              return (
                <section className="list-group-item">
                  <h4 className="list-group-item-heading">Slack ID</h4>
                  <p className="list-group-item-text"><a href={`https://x-team.slack.com/messages/@${user.slackId}/`} target="_blank">{user.slackId}</a></p>
                </section>
              );
            }
          })()}

          {(() => {
            if (user.website) {
              return (
                <section className="list-group-item">
                  <h4 className="list-group-item-heading">Website</h4>
                  <p className="list-group-item-text"><a href={user.website} target="_blank">{user.website}</a></p>
                </section>
              );
            }
          })()}

          {(() => {
            if (user.nationality) {
              return (
                <section className="list-group-item">
                  <h4 className="list-group-item-heading">Nationality</h4>
                  <p className="list-group-item-text">{user.nationality}</p>
                </section>
              );
            }
          })()}

          {(() => {
            if (user.aboutMe) {
              return (
                <section className="list-group-item">
                  <h4 className="list-group-item-heading">About me</h4>
                  <p className="list-group-item-text">{user.aboutMe}</p>
                </section>
              );
            }
          })()}
        </div>
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
