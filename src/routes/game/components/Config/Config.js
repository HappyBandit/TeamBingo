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
import s from './Config.css';
import Size from './components/Size';
import Delete from './components/Delete';
import Free from './components/Free';

class Config extends React.Component {
    static propTypes = {
        config: PropTypes.shape({
            columns: PropTypes.number,
            rows: PropTypes.number,
            freeSpace: PropTypes.bool,
        }),
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        config: {},
        id: '',
    };

    render () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Config</div>
                <div className="panel-body">
                    <p>Any changes to the configuration will require all users to rebuild their boards to get the new data</p>
                    <div className="row">
                        <div className="col-xs-12 col-md-8">
                            <Size id={this.props.id} config={this.props.config} />
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <Delete id={this.props.id} />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <Free id={this.props.id} selected={this.props.config.freeSpace} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Config);
