import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Clubs } from '../../api/club/Clubs';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  clubName: String,
  website: String,
  image: String,
  description: String,
  Admin: String,
  category: {
    type: String,
    allowedValues: ['Business', 'Engineering', 'Arts', 'Music', 'Other'],
    defaultValue: 'Other',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, website, image, description, Admin, category } = data;
    Clubs.collection.insert({ clubName, website, image, description, Admin, category },
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
            <Header as="h2" textAlign="center" inverted>Add Contact</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='clubName'/>
                <TextField name='website'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <TextField name='Admin'/>
                <TextField name='category'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddClub;
