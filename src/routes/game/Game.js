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
import io from 'socket.io-client';
import s from './Game.css';
import Config from './components/Config';
import Boxes from './components/Boxes';
import NewBoard from './components/NewBoard';
import CurrentBoards from './components/CurrentBoards';

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
                active: PropTypes.bool.isRequired,
                timestamp: PropTypes.string,
                selected: PropTypes.bool,
            })),
            boards: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                timestamp: PropTypes.string.isRequired,
            })),
        }).isRequired,
    };

    constructor (input) {
        super(input);

        this.selectBox = this.selectBox.bind(this);
        this.setType = this.setType.bind(this);


        this.state = {
            type: this.props.game.type,
        };

        this.setType();
    }

    setType () {
        if (this.state.type === 0) {
            this.socket = io('http://localhost', { query: `gameId=${this.props.game._id}` });
        }
    }

    selectBox (timestamp, selected) {
        if (this.state.type === 0) {
            this.socket.emit('click:box', { timestamp, selected });
        }
    }

    render () {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>{this.props.game.name}</h1>
                    <Config id={this.props.game._id} config={this.props.game.config} />
                    <Boxes id={this.props.game._id} boxes={this.props.game.boxes} type={this.props.game.type} onSelect={this.selectBox} />
                    <NewBoard id={this.props.game._id} />
                    <CurrentBoards id={this.props.game._id} boards={this.props.game.boards} />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Game);
