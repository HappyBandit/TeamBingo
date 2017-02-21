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
import s from './Game.css';
import Size from './components/size/Size';

class Game extends React.Component {
    static propTypes = {
        game: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
            config: PropTypes.shape({
                columns: PropTypes.number,
                rows: PropTypes.number,
            }),
            boxes: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string.isRequired,
                active: PropTypes.number.isRequired,
            })),
        }).isRequired,
    };

    render () {
        console.log(JSON.stringify(this.props));
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>{this.props.game.name}</h1>
                    <Size id={this.props.game._id} config={this.props.game.config} />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Game);
