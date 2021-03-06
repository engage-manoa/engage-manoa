import React, { createRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, CardGroup, Checkbox, Container, Header, Loader, Grid, Sticky, Ref, Rail } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/club/Clubs';
import Club from '../components/Club';

let tagFilter = []; // array to hold tags that we are filtering for
const allTags = ['Academic/Professional', 'Religious/Spiritual', 'Leisure/Recreational', 'Honorary Society', 'Ethnic/Cultural',
  'Service', 'Business', 'Engineering', 'Arts', 'Music', 'Other']; // list of tags you can sellect to filter for

class ListClubs extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  contextRef = createRef();

  constructor(props) {
    super(props);
    this.state = { tagFilterState: [] };
  }

  clearTags() {
    tagFilter = [];
    this.setState({
      tagFilterState: tagFilter,
    });
  }

  // checks if the tag is in the list being filtered for, if it is then it is removed. If it isn't it is added
  handleTags(tag) {
    const num = tagFilter.indexOf(tag);
    if (num === -1) {
      tagFilter.push(tag);
    } else {
      tagFilter[num] = tagFilter[tagFilter.length - 1];
      tagFilter.pop();
    }
    this.setState({
      tagFilterState: tagFilter,
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div id="list-clubs-page" className='redBackground'>
          <Header as="h2" textAlign="center" className='pagetitles'>List of Available Clubs</Header>
          <Grid>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={3}>
              <Ref innerRef={this.contextRef}>
              <Rail position='middle'>
              <Sticky context={this.contextRef} pushing>
                    <Container className='tagbox'>
                      <Grid>
                        {allTags.map((value, index) => <Grid.Row key={index}>
                          <Checkbox checked = {tagFilter.indexOf(value) !== -1} label={value} onClick={() => this.handleTags(value) }/>    </Grid.Row>)}
                        <Grid.Row>   </Grid.Row>
                      </Grid>
                      <Button content='Clear All' onClick={() => this.clearTags() } />
                      <Button content='Print' onClick={() => this.printTags() } />
                    </Container>
                  </Sticky>
              </Rail>
              </Ref>
            </Grid.Column>

            <Grid.Column width={12}>
              <Container>
                <CardGroup>
                  {_.filter(this.props.clubs, function (club) {
                    // if no tags are being filtered then all clubs are shown, otherwise we check if the club's category is among those being filtered
                      if (tagFilter.length === 0) {
                        return true;
                      }
                      for (let i = 0; i < tagFilter.length; i++) {
                        if (club.category.indexOf(tagFilter[i]) !== -1) {
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
