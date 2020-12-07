import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div id='landing-page' className='backgroundImage'>
          <Grid stackable centered container columns={2} rows={2}>
            <Grid.Row className='maintitle' style={ { marginTop: 100 } }>
              <Header inverted>Engage Manoa</Header>
            </Grid.Row>
            <Grid.Row className='subtitle' style={ { marginLeft: 290, marginRight: 290 } }>
              <Header inverted as='h2'>A place to find all the great clubs at UH Manoa</Header>
            </Grid.Row>
            <Grid.Column className='mainbox' textAlign='center' style={ { marginTop: 100, marginBottom: 200 } }>
              <Icon size='huge' name='users'/>
              <Header as='h1'>Join UHM Clubs</Header>
              <Header as='h3'>Using the list clubs feature you will be able to view all available clubs that is registered with engage-manoa</Header>
            </Grid.Column>
            <Grid.Column className='mainbox' textAlign='center' style={ { marginTop: 100, marginBottom: 200 } }>
              <Icon size='huge' name='file alternate'/>
              <Header as='h1'>Create New Clubs</Header>
              <Header as='h3'>You can create your own club for other people to join!</Header>
            </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Landing;
