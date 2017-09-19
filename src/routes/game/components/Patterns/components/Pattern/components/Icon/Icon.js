import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Icon.css';

class Icon extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.bool).isRequired,
    };

    render () {
        return (
            <tr>
                {this.props.items.map((item, index) => (
                    <td
                        key={index}
                        className={`${s.box} ${item ? s.active : null}`}
                    />
                ))}
            </tr>
        );
    }
}

export default withStyles(s)(Icon);
