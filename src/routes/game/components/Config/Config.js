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

class Config extends React.Component {
    static propTypes = {
        config: PropTypes.shape({
            columns: PropTypes.number,
            rows: PropTypes.number,
        }),
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        config: [],
        id: '',
    };

    render () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Config</div>
                <div className="panel-body">
                    <Size id={this.props.id} config={this.props.config} />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Config);
