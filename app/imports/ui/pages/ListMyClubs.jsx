import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CardGroup, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { MyClubs } from '../../api/myclub/MyClubs';
import RemovableCard from '../components/RemovableCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMyClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='redBackground'>
          <Container>
            <Header inverted as="h2" textAlign="center">List of My Clubs</Header>
            <CardGroup>
              {this.props.myclubs.map((club, index) => <RemovableCard key={index} club={club} MyClubs={MyClubs}/>)}
            </CardGroup>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListMyClubs.propTypes = {
  myclubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(MyClubs.userPublicationName);
  return {
    myclubs: MyClubs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListMyClubs);
