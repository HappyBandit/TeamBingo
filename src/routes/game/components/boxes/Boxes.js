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
import s from './Boxes.css';
import Add from './components/add/Add';

class Boxes extends React.Component {
    static propTypes = {
        boxes: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
        })),
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        boxes: [],
        id: '',
    };

    constructor (props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);

        this.state = {
            boxes: props.boxes || [],
        };
    }

    onAdd (boxes) {
        this.setState({ boxes });
    }

    render () {
        return (
            <div className={s.root}>
                <ul>
                    {this.state.boxes.map(item => (
                        <li key={item.timestamp} className={item.active ? s.activeBox : s.disabledBox}>
                            {item.text}
                        </li>
                    ))}
                </ul>
                <Add id={this.props.id} onAdd={this.onAdd} />
            </div>
        );
    }
}

export default withStyles(s)(Boxes);
