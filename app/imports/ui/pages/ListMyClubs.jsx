import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CardGroup, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { MyClubs } from '../../api/myclub/MyClubs';
import { Clubs } from '../../api/club/Clubs';
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
        <div className='redBackground' id="list-my-clubs-page">
          <Container>
            <Header as="h2" textAlign="center" className='pagetitles'>List of My Clubs</Header>
            {this.props.myClubs.length > 0 ? <CardGroup>
              {/* eslint-disable-next-line max-len */}
              {this.props.myClubs.map((myClub, index) => <RemovableCard key={index} id={myClub._id} club={this.props.clubs.filter(current => current._id === myClub.clubId)[0]}/>)}</CardGroup> : <Container textAlign='center' style={{ height: 500 }} as='h2'>You do not have any clubs added.</Container> }
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListMyClubs.propTypes = {
  myClubs: PropTypes.array.isRequired,
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(MyClubs.userPublicationName);
  const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
  return {
    myClubs: MyClubs.collection.find({}).fetch(),
    clubs: Clubs.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListMyClubs);
