import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Delete from './components/Delete';
import Active from './components/Active';
import Select from './components/Select';
import s from './Box.css';

class Box extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        box: PropTypes.shape({
            text: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
            selected: PropTypes.bool,
        }).isRequired,
        index: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    render () {
        return (
            <tr className={this.props.box.active ? s.activeBox : s.disabledBox}>
                <td className={s.tableIndex}>
                    {this.props.index + 1}
                </td>
                <td className={s.tableText}>
                    {this.props.box.text}
                </td>
                <td className={s.tableActive}>
                    {(this.props.type === 0) ? (<Select {...this.props} />) : ('')}
                </td>
                <td className={s.tableActive}>
                    <Active {...this.props} />
                </td>
                <td className={s.tableButton}>
                    <Delete {...this.props} />
                </td>
            </tr>
        );
    }
}

export default withStyles(s)(Box);
