import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { MyClubs } from '../../api/myclub/MyClubs';

/** Create a schema to specify the structure of the data to appear in the form. */

const bridge = new SimpleSchema2Bridge(MyClubs.schema);

/** Renders the Page for adding a document. */
export default class AddToMyClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, website, image, description, Admin, category } = data;
    const member = Meteor.user().username;
    MyClubs.collection.insert({ clubName, website, image, description, Admin, category, member },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <SubmitField value='Add'/>
                <ErrorsField/>
                <HiddenField name='clubName' value={this.props.clubName}/>
                <HiddenField name='website' value={this.props.website}/>
                <HiddenField name='image' value={this.props.image}/>
                <HiddenField name='description' value={this.props.description}/>
                <HiddenField name='Admin' value={this.props.Admin}/>
                <HiddenField name='category' value={this.props.category}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}
AddToMyClub.propTypes = {
  clubName: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Admin: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
