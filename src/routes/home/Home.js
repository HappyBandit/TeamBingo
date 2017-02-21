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
import s from './Home.css';
import Link from '../../components/Link';

class Home extends React.Component {
    static propTypes = {
        games: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.number.isRequired,
        })).isRequired,
    };

    render () {
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <h1>Current Games</h1>
                    {this.props.games.map(item => (
                        <article key={item._id} className={s.newsItem}>
                            <Link to={`game/${item._id}`}>
                                <h1 className={s.newsTitle}>{item.name}</h1>
                            </Link>
                            <div className={s.newsDesc}>{item.type}</div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Home);
