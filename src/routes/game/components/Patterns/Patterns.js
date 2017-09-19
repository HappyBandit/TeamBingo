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
import Pattern from './components/Pattern/Pattern';

class Patterns extends React.Component {
    static propTypes = {
        patterns: PropTypes.arrayOf(PropTypes.shape({
            indexes: PropTypes.arrayOf(PropTypes.bool).isRequired,
            active: PropTypes.bool.isRequired,
            timestamp: PropTypes.string.isRequired,
        })),
        config: PropTypes.shape({
            columns: PropTypes.number,
            rows: PropTypes.number,
        }).isRequired,
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        patterns: [],
        id: '',
    };

    constructor (props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            patterns: props.patterns || [],
        };
    }

    onChange (patterns) {
        this.setState({ patterns });
    }

    render () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Patterns</div>
                <div className="panel-body">
                    <p>This is where you can add and remove the patterns available in a Game. You can disable a box so that
                        is can be used at a later time.</p>
                </div>

                {/* Table */}
                <table className="table table-striped table-hover">
                    <tbody>
                        {this.state.patterns.map((item, index) => (
                            <Pattern
                                id={this.props.id}
                                key={item.timestamp}
                                pattern={item}
                                config={this.props.config}
                                index={index}
                                onChange={this.onChange}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="panel-footer">
                    <Add id={this.props.id} onAdd={this.onChange} config={this.props.config} />
                </div>
            </div>
        );
    }
}

export default Patterns;
