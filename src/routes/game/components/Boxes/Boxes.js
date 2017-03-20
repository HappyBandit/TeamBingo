/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Add from './components/Add';
import Box from './components/Box';

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

        this.onChange = this.onChange.bind(this);

        this.state = {
            boxes: props.boxes || [],
        };
    }

    onChange (boxes) {
        this.setState({ boxes });
    }

    render () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Boxes</div>
                <div className="panel-body">
                    <p>This is where you can add and remove the boxes available in a Game. You can disable a box so that
                        is can be used at a later time.</p>
                </div>

                {/* Table */}
                <table className="table table-striped table-hover">
                    <tbody>
                        {this.state.boxes.map((item, index) => (
                            <Box
                                id={this.props.id}
                                key={item.timestamp}
                                box={item}
                                index={index}
                                onChange={this.onChange}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="panel-footer">
                    <Add id={this.props.id} onAdd={this.onChange} />
                </div>
            </div>
        );
    }
}

export default Boxes;
