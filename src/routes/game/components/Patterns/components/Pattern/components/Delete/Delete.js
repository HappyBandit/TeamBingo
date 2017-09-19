import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import graphQlFetch from '../../../../../../../../core/graphQlFetch';

@inject('notification')
class Delete extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        pattern: PropTypes.shape({
            indexes: PropTypes.array.isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);

        this.deletePattern = this.deletePattern.bind(this);
    }

    deletePattern () {
        graphQlFetch(`mutation{removePattern(timestamp:"${this.props.pattern.timestamp}",gameId:"${this.props.id}"){patterns{indexes,active,timestamp}}}`)
        .then((resp) => {
            this.props.onChange(resp.removePattern.patterns);
        })
        .catch((error) => {
            this.props.notification.error(error.message);
        });
    }

    render () {
        return (
            <button className="btn btn-danger" onClick={this.deletePattern}>
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
