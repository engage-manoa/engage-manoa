import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, CardGroup, Checkbox, Container, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Clubs';
import Club from '../components/Club';

let tagFilter = [];
const allTags = ['Business', 'Engineering', 'Arts', 'Music', 'Other'];

class ListClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  // filterClubs() {
  //   return _.filter(this.props.clubs, function () { return true; });
  // }

  clearTags() {
    tagFilter = [];
    console.log(tagFilter);
  }

  printTags() {
    console.log(tagFilter);
  }

  handleTags(tag) {
    const num = tagFilter.indexOf(tag);
    if (num === -1) {
      tagFilter.push(tag);
    } else {
      tagFilter[num] = tagFilter[tagFilter.length - 1];
      tagFilter.pop();
    }
    console.log(tagFilter);
    console.log(tagFilter.indexOf(tag) !== -1);
    this.forceUpdate();
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='redBackground'>
          <Header inverted as="h2" textAlign="center">List of Available Clubs</Header>
          <Grid>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={3}>
              <Container>
                <Grid>
                  {allTags.map((value, index) => <Grid.Row key={index}>
                    <Checkbox checked = {tagFilter.indexOf(value) !== -1} label={value} onClick={() => this.handleTags(value) }/>    </Grid.Row>)}
                  <Grid.Row>   </Grid.Row>
                </Grid>
                <Button content='Clear All' onClick={() => this.clearTags() } />
                <Button content='Print Tags' onClick={() => this.printTags() } />
              </Container>
            </Grid.Column>

            <Grid.Column width={12}>
              <Container>
                <CardGroup>
                  {_.filter(this.props.clubs, function (club) {
                      if (tagFilter.length === 0) {
                        return true;
                      }
                      for (let i = 0; i < tagFilter.length; i++) {
                         if (club.category === tagFilter[i]) {
                           return true;
                         }
                      }
                      return false;
    }).map((club, index) => <Club key={index} club={club}/>)}
                </CardGroup>
              </Container>
            </Grid.Column>
          </Grid>
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
