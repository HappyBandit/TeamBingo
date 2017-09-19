import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Delete from './components/Delete';
import Active from './components/Active';
import Icon from './components/Icon';
import s from './Pattern.css';

class Pattern extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        pattern: PropTypes.shape({
            indexes: PropTypes.array.isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
        }).isRequired,
        config: PropTypes.shape({
            columns: PropTypes.number,
            rows: PropTypes.number,
        }).isRequired,
        index: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    render () {
        const indexes = this.props.pattern.indexes;
        const rows = [];
        const size = this.props.config.columns;

        while (indexes.length > 0) {
            rows.push(<Icon items={indexes.splice(0, size)} key={indexes.length} />);
        }

        return (
            <tr className={this.props.pattern.active ? s.activePattern : s.disabledPattern}>
                <td className={s.tableIndex}>
                    {this.props.index + 1}
                </td>
                <td className={s.tableText}>
                    <table>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
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

export default withStyles(s)(Pattern);
