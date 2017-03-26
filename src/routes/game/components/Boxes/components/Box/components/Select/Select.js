import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import graphQlFetch from '../../../../../../../../core/graphQlFetch';
import s from './Select.css';

@inject('notification')
class Select extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        box: PropTypes.shape({
            text: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
            selected: PropTypes.bool,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected: this.props.box.selected,
        };
    }

    handleChange (event) {
        const target = event.target;

        this.setState({
            selected: target.checked,
            previousSelected: this.state.selected,
        });

        this.updateBox(target.checked);
    }

    updateBox (selected) {
        graphQlFetch(`mutation{selectBox(boxTimestamp:"${this.props.box.timestamp}",gameId:"${this.props.id}",selected:${selected}){text,selected,timestamp}}`)
        .then(() => {
            this.props.onSelect(this.props.box.timestamp, selected);
        })
        .catch((error) => {
            this.setState({
                selected: this.state.previousSelected,
            });
            this.props.notification.error(error.message);
        });
    }

    render () {
        return (
            <label htmlFor={`select${this.props.box.timestamp}`} className={`${s.switch} ${s.switchBlue}`}>
                <input
                    id={`select${this.props.box.timestamp}`}
                    type="checkbox"
                    className={s.switchInput}
                    checked={this.state.selected}
                    onChange={this.handleChange}
                />
                <span className={s.switchLabel} data-on="Drawn" data-off="Remains" />
                <span className={s.switchHandle} />
            </label>
        );
    }
}

Select.wrappedComponent.propTypes = {
    notification: PropTypes.shape({
        error: PropTypes.func,
    }),
};

Select.wrappedComponent.defaultProps = {
    notification: {},
};

export default withStyles(s)(Select);
