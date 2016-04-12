import React, { Component, PropTypes } from 'react';

class TeamDetails extends Component {
  render() {
    const { team } = this.props;

    return (
      <div id="TeamDetails" className="accordion" role="tablist" aria-multiselectable="true">
        <header className="accordion-header" href="#" role="tab" id="TeamDetailsHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#TeamDetails"
            aria-expanded="true" aria-controls="TeamDetailsCollapse"
            href="#TeamDetailsCollapse">Details</h3>
        </header>

        <div id="TeamDetailsCollapse" className="collapse in list-group accordion-body"
          role="tabpanel" aria-labelledby="TeamDetailsHeading">
          <section className="list-group-item">
            <h4 className="list-group-item-heading">Name</h4>
            <p className="list-group-item-text">{team.name}</p>
          </section>

          <section className="list-group-item">
            <h4 className="list-group-item-heading">Summary</h4>
            <p className="list-group-item-text">{team.summary}</p>
          </section>

          {(() => {
            if (team.description) {
              return (
                <section className="list-group-item">
                  <h4 className="list-group-item-heading">Description</h4>
                  <p className="list-group-item-text">{team.description}</p>
                </section>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

TeamDetails.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default TeamDetails;
