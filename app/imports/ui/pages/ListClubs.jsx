import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CardGroup, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Clubs';
import Club from '../components/Club';

const tagFilter = ['Engineering'];

class ListClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  // filterClubs() {
  //   return _.filter(this.props.clubs, function () { return true; });
  // }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='redBackground'>
          <Container>
            <Header inverted as="h2" textAlign="center">List of Available Clubs</Header>
            <CardGroup>
              {_.filter(this.props.clubs, function (club) {
                  for (let i = 0; i < tagFilter.length; i++) {
                     if (club.category === tagFilter[i]) {
                       return true;
                     }
                  }
                  return false;
}).map((club, index) => <Club key={index} club={club}/>)}
            </CardGroup>
          </Container>
        </div>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  return {
    clubs: Clubs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListClubs);
