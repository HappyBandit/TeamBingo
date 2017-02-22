/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Game from './Game';
import fetch from '../../core/fetch';

export default {
    path: '/game',
    children: [
        {
            path: '/',                   // www.example.com/admin/users
            action () {
                return {
                    redirect: '/',
                };
            },
        },
        {
            path: '/:id',          // www.example.com/admin/users/john
            async action (cxt, { id }) {
                const resp = await fetch('/graphql', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `query{game(id:"${id}"){_id,name,type,config{rows,columns},boxes{text,active,timestamp}}}`,
                    }),
                    credentials: 'include',
                });
                const { data } = await resp.json();
                if (!data || !data.game) throw new Error('Failed to load the news feed.');
                data.game = data.game[0];
                return {
                    title: `${data.game.name}`,
                    component: <Layout><Game game={data.game} /></Layout>,
                };
            },
        },
    ],
};
