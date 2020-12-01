import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='backgroundImage'>
          <Grid stackable centered container columns={2} id='landing-page'>
            <Grid.Column textAlign='center'style={ { marginTop: 200, marginBottom: 200 } }>
              <Icon inverted size='huge' name='users'/>
              <Header inverted as='h1'>
              Join UHM Clubs
              </Header>
              <Header inverted as='h3'>
              Using the list clubs feature you will be able to view all available clubs that is registered with engage-manoa
              </Header>
            </Grid.Column>

            <Grid.Column textAlign='center' style={ { marginTop: 200, marginBottom: 200 } }>
              <Icon inverted size='huge' name='file alternate'/>
              <Header inverted as='h1'>
                Create New Clubs
              </Header>
              <Header inverted as='h3'>
                You can create your own club for other people to join!
              </Header>
            </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Landing;
