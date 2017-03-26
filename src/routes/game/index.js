/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import Layout from '../../components/Layout';
import Game from './Game';
import fetch from '../../core/fetch';

export default {
    path: '/game',
    children: [
        {
            path: '/',
            action () {
                return {
                    redirect: '/',
                };
            },
        },
        {
            path: '/:id',

            children: [
                {
                    path: '/',
                    async action (cxt, { id }) {
                        const resp = await fetch('/graphql', {
                            method: 'post',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: `query{game(id:"${id}"){_id,name,type,config{rows,columns,freeSpace},boxes{text,active,timestamp},boards{name,timestamp}}}`,
                            }),
                            credentials: 'include',
                        });
                        const { data, errors } = await resp.json();

                        if (!data || errors) throw new Error(`Failed to load game Data: ${JSON.stringify(errors)}.`);
                        data.game = data.game[0];
                        return {
                            title: `${data.game.name}`,
                            component: <Layout><Game game={data.game} /></Layout>,
                        };
                    },
                },
                require('./board').default,
            ],

            async action ({ next }) {
                // Execute each child route until one of them return the result
                return next();
            },
        },
    ],
};
