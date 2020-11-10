import React from 'react';
import { Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Notes } from '../../api/note/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class Note extends React.Component {
  render() {
    return (
        <Feed.Event>
            <Feed.Content>
                <Feed.Date content={this.props.note.createdAt.toLocaleDateString('en-US')} />
                <Feed.Summary>
                    {this.props.note.note}
                </Feed.Summary>
                <Button icon='trash' size='tiny' onClick={() => Notes.collection.remove(this.props.note._id)}/>
            </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Note.propTypes = {
  note: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
