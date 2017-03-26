/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { inject } from 'mobx-react';
import graphQlFetch from '../../../../../../core/graphQlFetch';

@inject('notification')
class Free extends React.Component {
    static propTypes = {
        selected: PropTypes.bool,
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        selected: false,
        id: '',
    };

    constructor (props) {
        super(props);

        this.onChangeFree = this.onChangeFree.bind(this);

        this.state = {
            freeSpace: props.selected,
        };
    }

    onChangeFree (event) {
        const oldConfig = this.state.freeSpace;
        this.setState({ freeSpace: event.target.checked });

        graphQlFetch(`mutation{updateConfig(id:"${this.props.id}",config:{freeSpace:${event.target.checked}}){_id}}`)
        .catch((error) => {
            this.props.notification.error(error.message);
            this.setState({ freeSpace: oldConfig });
        });
    }

    render () {
        return (
            <div className="checkbox">
                <label htmlFor="free-space-edit">
                    <input
                        id="free-space-edit"
                        type="checkbox"
                        checked={this.state.freeSpace}
                        onChange={this.onChangeFree}
                    />
                    Free Space on Board
                </label>
            </div>
        );
    }
}

Free.wrappedComponent.propTypes = {
    notification: PropTypes.shape({
        error: PropTypes.func,
    }),
};

Free.wrappedComponent.defaultProps = {
    notification: {},
};

export default Free;
