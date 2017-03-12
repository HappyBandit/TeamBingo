/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrentBoards.css';
import Link from '../../../../components/Link';

class Boxes extends React.Component {
    static propTypes = {
        boards: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
        })).isRequired,
        id: PropTypes.string.isRequired,
    };

    render () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Current Boards</div>
                <div className="panel-body">
                    <p>Here are all boards created for this game</p>
                </div>

                {/* Table */}
                <table className="table table-striped table-hover">
                    <tbody>
                        {this.props.boards.map((item, index) => (
                            <tr key={item.timestamp}>
                                <td className={s.tableIndex}>
                                    {index + 1}
                                </td>
                                <td className={s.tableName}>
                                    <Link to={`/game/${this.props.id}/board/${item.timestamp}`}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td className={s.tableTime}>
                                    {(new Date(parseInt(item.timestamp, 10))).toDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withStyles(s)(Boxes);
