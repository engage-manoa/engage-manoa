import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CardGroup, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import AdminClub from '../components/AdminClub';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAdminClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='redBackground'>
          <Container>
            <Header inverted as="h2" textAlign="center">List Clubs (Admin)</Header>
            <CardGroup>
              {this.props.clubs.map((club, index) => <AdminClub key={index} club={club}/>)}
            </CardGroup>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListAdminClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.adminPublicationName);
  return {
    clubs: Clubs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListAdminClubs);
