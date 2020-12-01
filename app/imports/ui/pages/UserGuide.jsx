import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserGuide extends React.Component {
  render() {
    return (
        <div className='userdiv'>
          <Grid container centered className='userdiv'>
            <Grid.Column>
              <Header as="h1" textAlign="center" inverted>User Guide</Header>
              <Header as="h4" textAlign="center" inverted>Follow this user guide for instructions on how to best
                use the currently available pages. Guide will be updated according to changes made for pages and
                features. Note that some pages and features are only available for club administrators.</Header>
              <Header as="h2" textAlign="center" inverted>Page: List Clubs</Header>
              <Image centered src="/images/ListClubs.jpg"/>
              <Header as="h3" textAlign="center" inverted>1: Select tags to filter clubs based on your interests</Header>
              <Header as="h3" textAlign="center" inverted>2: Add a club to your personal club list</Header>
              <Header as="h3" textAlign="center" inverted>3: Visit the club website for more information</Header>
              <Header as="h3" textAlign="center" inverted>4: Contact the club advisor for additional quesitons</Header>
              <Header as="h2" textAlign="center" inverted>Page: List My Clubs</Header>
              <Header as="h3" textAlign="center" inverted>Use this page to view your personal list of clubs</Header>
              <Header as="h2" textAlign="center" inverted>Page: Admin</Header>
              <Image centered src="/images/Admin.jpg"/>
              <Header as="h3" textAlign="center" inverted>This page is limited to club administrators only. Manage your clubs and use the Edit feature ot update your clubs information</Header>
              <Header as="h2" textAlign="center" inverted>Page: Add Club</Header>
              <Image centered src="/images/AddClub.jpg"/>
              <Header as="h3" textAlign="center" inverted>This page is limited to club administrators only. Create a
                brand new club tile with information requested. Be sure to select the correct tag for your club!</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default UserGuide;
