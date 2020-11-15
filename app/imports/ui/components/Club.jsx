import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Club extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image
                src={this.props.club.image}
                fluid
                className='image'
            />
            <Card.Header>{this.props.club.clubName}</Card.Header>
            <Card.Meta>{this.props.club.location}</Card.Meta>
            <Card.Description>
              {this.props.club.description}
            </Card.Description>
            <Card.Meta>{this.props.club.category}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/edit/${this.props.club._id}`}>Edit Info</Link>
          </Card.Content>
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
