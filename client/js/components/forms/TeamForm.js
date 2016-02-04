import React, { Component, PropTypes } from 'react';
import ErrorList from '../forms/ErrorList';

class TeamForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.team;
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

    let header = <h3>Add team</h3>;
    if (this.state.id) {
      header = <h3>Edit team #{this.state.id}</h3>;
    }

    return (
      <div>
        <ErrorList errors={errors} showFieldErrors/>
        {header}
        <form id="teamEditForm" onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
            <input type="text" placeholder="Name" value={this.state.name} minLength="2" maxLength="32" onChange={this.onInputChange.bind(this, 'name')} required/>
          </div>
          <div className="row">
            <input type="text" placeholder="Summary" value={this.state.summary} maxLength="128" onChange={this.onInputChange.bind(this, 'summary')} required/>
          </div>
          <div className="row">
            <textarea placeholder="Description" value={this.state.description} maxLength="1024" onChange={this.onInputChange.bind(this, 'description')}/>
          </div>
          <div className="row">
            <button className="button" type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

TeamForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  errors: PropTypes.object,
  team: PropTypes.shape({
    id: PropTypes.string
  })
};

TeamForm.defaultProps = {
  team: {}
};

export default TeamForm;
