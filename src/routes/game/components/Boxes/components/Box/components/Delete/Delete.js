import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import graphQlFetch from '../../../../../../../../core/graphQlFetch';

@inject('notification')
class Delete extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        box: PropTypes.shape({
            text: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);

        this.deleteBox = this.deleteBox.bind(this);
    }

    deleteBox () {
        graphQlFetch(`mutation{removeBox(timestamp:"${this.props.box.timestamp}",gameId:"${this.props.id}"){boxes{text,active,timestamp}}}`)
        .then((resp) => {
            this.props.onChange(resp.removeBox.boxes);
        })
        .catch((error) => {
            this.props.notification.error(error.message);
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

Delete.wrappedComponent.propTypes = {
    notification: PropTypes.shape({
        error: PropTypes.func,
    }),
};

Delete.wrappedComponent.defaultProps = {
    notification: {},
};

export default Delete;
