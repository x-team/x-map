import React, { Component, PropTypes } from 'react';

class ConferenceDetails extends Component {
  render() {
    const { conference } = this.props;

    return (
      <div id="ConferenceDetails" className="accordion" role="tablist" aria-multiselectable="true">
        <header className="accordion-header" href="#" role="tab" id="ConferenceDetailsHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#ConferenceDetails"
            aria-expanded="true" aria-controls="ConferenceDetailsCollapse"
            href="#ConferenceDetailsCollapse">Details</h3>
        </header>

        <div id="ConferenceDetailsCollapse" className="collapse in list-group accordion-body"
          role="tabpanel" aria-labelledby="ConferenceDetailsHeading">
          <section className="list-group-item">
            <h4 className="list-group-item-heading">Name</h4>
            <p className="list-group-item-text">{conference.name}</p>
          </section>
        </div>
      </div>
    );
  }
}

ConferenceDetails.propTypes = {
  conference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default ConferenceDetails;
