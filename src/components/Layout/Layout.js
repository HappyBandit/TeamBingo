/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Provider } from 'mobx-react';
import { autorun } from 'mobx';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NotificationSystem from 'react-notification-system';
import NotificationStore from '../../stores/notification';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    constructor (input) {
        super(input);
        this._notificationStore = new NotificationStore();

        this._addNotification = this._addNotification.bind(this);
    }

    componentDidMount () {
        this._notificationSystem = this.notificationSystem;

        autorun(() => {
            this._addNotification();
        });
    }

    _addNotification () {
        if (this._notificationStore.notification.level !== undefined) {
            this._notificationSystem.addNotification(this._notificationStore.notification);
            this._notificationStore.remove();
        }
    }

    render () {
        return (
            <div>
                <Header />
                <Provider notification={this._notificationStore}>
                    {this.props.children}
                </Provider>
                <Feedback />
                <Footer />
                <NotificationSystem
                    ref={(c) => {
                        this.notificationSystem = c;
                    }}
                />
            </div>
        );
    }
}

export default withStyles(s)(Layout);
