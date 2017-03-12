/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PouchDB from 'pouchdb';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import GameType from '../types/GameType';

const deleteBoard = {
    type: GameType,
    args: {
        timestamp: {
            name: 'Timestamp of Board',
            type: new GraphQLNonNull(GraphQLID),
        },
        gameId: {
            name: 'Game ID to make board from',
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve (root, { timestamp, gameId }) {
        const db = new PouchDB('http://localhost:5984/games');

        return db.get(gameId).then((result) => {
            result.boards.splice(result.boards.findIndex(x => x.timestamp === timestamp), 1);

            return db.put(result);
        }).then(result => db.get(result.id)).then(doc => doc);
    },
};

export default deleteBoard;
