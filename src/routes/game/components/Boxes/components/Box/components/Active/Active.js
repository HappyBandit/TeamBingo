import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import graphQlFetch from '../../../../../../../../core/graphQlFetch';
import s from './Active.css';

@inject('notification')
class Active extends React.Component {
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

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            active: this.props.box.active,
        };
    }

    handleChange (event) {
        const target = event.target;

        this.setState({
            active: target.checked,
            previousActive: this.state.active,
        });

        this.updateBox(target.checked);
    }

    updateBox (active) {
        graphQlFetch(`mutation{updateBox(timestamp:"${this.props.box.timestamp}",gameId:"${this.props.id}",box:{active:${active}}){boxes{text,active,timestamp}}}`)
        .then((resp) => {
            this.props.onChange(resp.updateBox.boxes);
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
            <label htmlFor={`active${this.props.box.timestamp}`} className={`${s.switch} ${s.switchGreen}`}>
                <input
                    id={`active${this.props.box.timestamp}`}
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
