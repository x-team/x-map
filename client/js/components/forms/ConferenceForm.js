import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/* Components */
import ErrorList from '../forms/ErrorList';

class ConferenceForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.conference;
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

    const cancelLink = (this.state.id) ? ('/conference/' + this.state.id) : '/conferences';

    return (
      <div id="ConferenceForm">
        <ErrorList errors={errors} showFieldErrors/>
        <form onSubmit={this.onSubmit.bind(this)}>
          <fieldset className="form-group">
            <label>Conference name</label>
            <input type="text" className="form-control" placeholder="Name" value={this.state.name}
              minLength="2" maxLength="32" onChange={this.onInputChange.bind(this, 'name')} required/>
            <small className="text-muted"><strong>Required.</strong> Min. length: 2 characters. Max. length: 32 characters.</small>
          </fieldset>

          <fieldset className="form-group">
            <button className="btn btn-primary" type="submit">Save</button>
            <span> </span>
            <Link className="btn btn-secondary" to={cancelLink} title="Cancel editing">Cancel</Link>
          </fieldset>
        </form>
      </div>
    );
  }
}

ConferenceForm.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  conference: PropTypes.shape({
    id: PropTypes.string
  })
};

ConferenceForm.defaultProps = {
  conference: {}
};

export default ConferenceForm;
