import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import graphQlFetch from '../../../../../../../../core/graphQlFetch';
import s from './Active.css';

@inject('notification')
class Active extends React.Component {
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

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            active: this.props.pattern.active,
        };
    }

    handleChange (event) {
        const target = event.target;

        this.setState({
            active: target.checked,
            previousActive: this.state.active,
        });

        this.updatePattern(target.checked);
    }

    updatePattern (active) {
        graphQlFetch(`mutation{updatePattern(timestamp:"${this.props.pattern.timestamp}",gameId:"${this.props.id}",pattern:{active:${active}}){patterns{indexes,active,timestamp}}}`)
        .then((resp) => {
            this.props.onChange(resp.updatePattern.patterns);
        })
        .catch((error) => {
            this.setState({
                active: this.state.previousActive,
            });
            this.props.notification.error(error.message);
        });
    }

    render () {
        return (
            <label htmlFor={`active${this.props.pattern.timestamp}`} className={`${s.switch} ${s.switchGreen}`}>
                <input
                    id={`active${this.props.pattern.timestamp}`}
                    type="checkbox"
                    className={s.switchInput}
                    checked={this.state.active}
                    onChange={this.handleChange}
                />
                <span className={s.switchLabel} data-on="On" data-off="Off" />
                <span className={s.switchHandle} />
            </label>
        );
    }
}

Active.wrappedComponent.propTypes = {
    notification: PropTypes.shape({
        error: PropTypes.func,
    }),
};

Active.wrappedComponent.defaultProps = {
    notification: {},
};

export default withStyles(s)(Active);
