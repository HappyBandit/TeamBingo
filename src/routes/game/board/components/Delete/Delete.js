import React, { PropTypes } from 'react';
import graphQlFetch from '../../../../../core/graphQlFetch';
import history from '../../../../../core/history';

class Delete extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);

        this.deleteBoard = this.deleteBoard.bind(this);
    }

    deleteBoard () {
        graphQlFetch(`mutation{deleteBoard(timestamp:"${this.props.timestamp}",gameId:"${this.props.id}"){_id}}`)
        .then((resp) => {
            if (resp.deleteBoard._id) {
                history.push(`/game/${resp.deleteBoard._id}`);
            } else {
                history.push('/error');
            }
        });
    }

    render () {
        return (
            <button className="btn btn-danger" onClick={this.deleteBoard}>
                Delete
            </button>
        );
    }
}

export default Delete;
