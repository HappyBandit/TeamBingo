import React, { PropTypes } from 'react';
import graphQlFetch from '../../../../../../core/graphQlFetch';
import history from '../../../../../../core/history';

class Delete extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);

        this.deleteBox = this.deleteBox.bind(this);
    }

    deleteBox () {
        graphQlFetch(`mutation{deleteGame(id:"${this.props.id}"){status,errorCode,errorMessage}}`)
        .then((resp) => {
            if (resp.deleteGame.status === 'Success') {
                history.push('/');
            } else {
                history.push('/error');
            }
        });
    }

    render () {
        return (
            <button className="btn btn-lg btn-danger" onClick={this.deleteBox}>
                Delete
            </button>
        );
    }
}

export default Delete;
