import React from 'react';
import { Loader, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import AddToMyClub from './AddToMyClub';
import { MyClubs } from '../../api/myclub/MyClubs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {
  render() {
    return (this.props.ready) ? this.renderCard() : <Loader active>Getting Data</Loader>;
  }

  renderCard() {
    return (
        <Card centered id="club-card">
          <Card.Content><Image
              src={this.props.club.image}
              style={{ width: 262, height: 262 }}
              rounded
              bordered
          />
          </Card.Content>
          <Card.Content>
            <Card.Header as='h3' textAlign='center'><a href={this.props.club.website}>{this.props.club.clubName}</a></Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Meta textAlign='center' className='border'>{this.props.club.category}</Card.Meta>
          </Card.Content>
          <Card.Content className='greenwords' as='h4'>Club Description:
            <Card.Description>{this.props.club.description}</Card.Description>
          </Card.Content>
          {Meteor.user().username === this.props.club.Admin ?
              // eslint-disable-next-line max-len
              <Card.Content extra><Link to={`/edit/${this.props.club._id}`}>Edit Info</Link> </Card.Content> : <Card.Content className='greenwords'>Contact admin at: {this.props.club.Admin}</Card.Content>}
          {_.contains(_.pluck(this.props.userClubs, 'clubId'), this.props.club._id) ? '' :
              <Card.Content extra>
            <AddToMyClub userClubs={_.pluck(this.props.userClubs)} clubId={this.props.club._id}/>
          </Card.Content>}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Club.propTypes = {
  club: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  userClubs: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(MyClubs.userPublicationName);
  return {
    userClubs: MyClubs.collection.find({}).fetch().filter(current => current.member === Meteor.user().username),
    ready: subscription.ready(),
  };
})(Club);
