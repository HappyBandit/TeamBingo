/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../../components/Layout';
import Board from './Board';
import fetch from '../../../core/fetch';

export default {
    path: '/board',
    children: [
        {
            path: '/',
            action () {
                return {
                    redirect: '/error',
                };
            },
        },
        {
            path: '/:board',
            async action (cxt, { id, board }) {
                const resp = await fetch('/graphql', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `query{game(id:"${id}"){_id,name,type,config{rows,columns},boards(timestamp:"${board}"){name,boxes{text,selected,timestamp}}}}`,
                    }),
                    credentials: 'include',
                });
                const { data } = await resp.json();
                if (!data || !data.game) throw new Error('Failed to load the news feed.');
                data.game = data.game[0];
                data.game.boards = data.game.boards[0];

                return {
                    title: `${data.game.name}`,
                    component: <Layout><Board game={data.game} /></Layout>,
                };
            },
        },
    ],
};
