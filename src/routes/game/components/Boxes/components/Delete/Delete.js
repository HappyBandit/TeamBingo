import React, { PropTypes } from 'react';
import graphQlFetch from '../../../../../../core/graphQlFetch';

class Delete extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);

        this.deleteBox = this.deleteBox.bind(this);
    }

    deleteBox () {
        graphQlFetch(`mutation{removeBox(timestamp:"${this.props.timestamp}",gameId:"${this.props.id}"){boxes{text,active,timestamp}}}`)
        .then((resp) => {
            this.props.onDelete(resp.removeBox.boxes);
        });
    }

    render () {
        return (
            <button className="btn btn-danger" onClick={this.deleteBox}>
                Delete
            </button>
        );
    }
}

export default Delete;
