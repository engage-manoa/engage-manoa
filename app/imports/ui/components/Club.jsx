import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content><Image
              src={this.props.club.image}
              style={{ width: 262, height: 262 }}
              rounded
              bordered
          />
          </Card.Content>
          <Card.Content><Card.Header as='h3' textAlign='center'><a href={this.props.club.website}>{this.props.club.clubName}</a></Card.Header></Card.Content>
          <Card.Content><Card.Meta textAlign='center' className='border'>{this.props.club.category}</Card.Meta></Card.Content>
          <Card.Content as='h4'>Club Description: <Card.Description>{this.props.club.description}</Card.Description></Card.Content>
          {Meteor.user().username === this.props.club.Admin ?
              <Card.Content extra><Link to={`/edit/${this.props.club._id}`}>Edit Info</Link> </Card.Content> : <Card.Content>Contact admin at: {this.props.club.Admin}</Card.Content>}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Club.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Club);
