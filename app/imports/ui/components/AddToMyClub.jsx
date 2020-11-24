import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { MyClubs } from '../../api/myclub/MyClubs';

/** Create a schema to specify the structure of the data to appear in the form. */

const bridge = new SimpleSchema2Bridge(MyClubs.schema);

/** Renders the Page for adding a document. */
class AddToMyClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubId, member } = data;
    MyClubs.collection.insert({ clubId, member },
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
        <Container>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <SubmitField position='centered' value='Add to My Clubs'/>
                <ErrorsField/>
                <HiddenField name='clubId' value={this.props.clubId}/>
                <HiddenField name='member' value={Meteor.user().username}/>
              </AutoForm>
        </Container>
    );
  }
}

AddToMyClub.propTypes = {
  clubId: PropTypes.string.isRequired,
};
export default (AddToMyClub);
