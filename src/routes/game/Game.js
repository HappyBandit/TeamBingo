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
import Patterns from './components/Patterns';
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
            patterns: PropTypes.arrayOf(PropTypes.shape({
                indexes: PropTypes.array.isRequired,
                active: PropTypes.bool.isRequired,
                timestamp: PropTypes.string,
            })),
            boards: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                timestamp: PropTypes.string.isRequired,
            })),
            bingo: PropTypes.bool,
        }).isRequired,
    };

    constructor (input) {
        super(input);

        this.selectBox = this.selectBox.bind(this);
        this.setType = this.setType.bind(this);

        const bingos = [];
        if (this.props.game.bingo) {
            console.log('Game');
            this.props.game.boards.forEach((board) => {
                if (board.bingo) {
                    bingos.push(board.name);
                }
            });
        }

        this.state = {
            type: this.props.game.type,
            bingos,
        };
    }

    componentDidMount () {
        this.setType();
    }

    onBingo ({ data }) {
        const newBingos = [...this.state.bingos, data.board];

        this.setState({
            bingos: newBingos,
        });
    }

    setType () {
        if (this.state.type === 0) {
            this.socket = io('/', { query: `gameId=${this.props.game._id}` });
            this.socket.on('game:bingo', data => this.onBingo({ data }));
        }
    }

    selectBox (timestamp, selected) {
        if (this.socket) {
            this.socket.emit('click:box', { timestamp, selected });
        }
    }

    render () {
        let bingos = null;

        if (this.state.bingos && this.state.bingos.length > 0) {
            bingos = (
                <div>
                    <h2>SOMEONE GOT A BINGO</h2>
                    {this.state.bingos.map(name => (
                        <h3 key={name}>{name} Got a Bingo</h3>
                    ))}
                </div>
            );
        }
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>{this.props.game.name}</h1>
                    {bingos}
                    <Config id={this.props.game._id} config={this.props.game.config} />
                    <Boxes
                        id={this.props.game._id}
                        boxes={this.props.game.boxes}
                        type={this.props.game.type}
                        onSelect={this.selectBox}
                    />
                    <Patterns
                        id={this.props.game._id}
                        patterns={this.props.game.patterns}
                        config={this.props.game.config}
                    />
                    <NewBoard id={this.props.game._id} />
                    <CurrentBoards id={this.props.game._id} boards={this.props.game.boards} />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Game);
