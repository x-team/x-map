import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import ProfileForm from '../forms/ProfileForm';

class ProfileEditPage extends Component {
  componentDidMount() {
    this.props.actions.userActiveChanged([this.props.params.id]);
  }

  componentWillUpdate(props) {
    props.actions.userActiveChanged([props.params.id]);
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  redirectToProfilePage(id) {
    const { history } = this.props;
    history.pushState(null, '/profile/' + id);
  }

  render() {
    const { actions, errors, users, params, history } = this.props;

    const user = users[params.id];
    if (!user) {
      history.pushState(null, '/404');
      return <span/>;
    }

    return (
      <div className="panel">
        <article>
          <section>
            <ProfileForm user={user} onSubmit={actions.userUpdate} onSuccess={this.redirectToProfilePage.bind(this, params.id)} errors={errors}/>
          </section>
        </article>
      </div>
    );
  }
}

ProfileEditPage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object,
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  })
};

function mapStateToProps(state) {
  return {
    users: state.users,
    errors: state.errors.userUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
