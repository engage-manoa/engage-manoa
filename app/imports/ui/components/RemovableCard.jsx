import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { MyClubs } from '../../api/myclub/MyClubs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RemovableCard extends React.Component {
  deleteFromList(id) {
    MyClubs.collection.remove(id);
  }

  render() {
    return (
        <Card centered>
          <Card.Content><Image
              src={this.props.club.map(current => current.image)}
              style={{ width: 262, height: 262 }}
              rounded
              bordered
          />
          </Card.Content>
          <Card.Content>
            <Card.Header as='h3' textAlign='center'><a href={this.props.club.map(current => current.website)}>{this.props.club.map(current => current.clubName)}</a></Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Meta textAlign='center' className='border'>{this.props.club.map(current => current.category)}</Card.Meta>
          </Card.Content>
          <Card.Content as='h4'>Club Description:
            <Card.Description>{this.props.club.map(current => current.description)}</Card.Description>
          </Card.Content>
          {Meteor.user().username === this.props.club.map(current => current.Admin) ?
              // eslint-disable-next-line max-len
              <Card.Content extra><Link to={`/edit/${this.props.club.map(current => current._id)}`}>Edit Info</Link> </Card.Content> : <Card.Content>Contact admin at: {this.props.club.map(current => current.Admin)}</Card.Content>}
          <Card.Content extra>
            <Button icon='trash' onClick={() => this.deleteFromList(this.props.id)}/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
RemovableCard.propTypes = {
  club: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
export default withRouter(RemovableCard);
