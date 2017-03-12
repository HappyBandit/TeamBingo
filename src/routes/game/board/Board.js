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
import s from './Board.css';

class Board extends React.Component {
    static propTypes = {
        game: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
            config: PropTypes.shape({
                columns: PropTypes.number,
                rows: PropTypes.number,
            }),
            boards: PropTypes.shape({
                name: PropTypes.string.isRequired,
                boxes: PropTypes.arrayOf(PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    timestamp: PropTypes.string,
                    selected: PropTypes.bool,
                })).isRequired,
            }).isRequired,
        }).isRequired,
    };

    render () {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>{this.props.game.boards.name}</h1>
                    <div className={s.board}>
                        {this.props.game.boards.boxes.map((box, index) => (
                            <div
                                key={box.timestamp || index}
                                className={`${s.box} ${box.selected ? s.selected : ''}`}
                                style={{ width: `${100 / this.props.game.config.columns}%` }}
                            >
                                <div className={s.square}>
                                    <p>
                                        {box.text || '\u00A0'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Board);