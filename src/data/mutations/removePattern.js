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

const removePattern = {
    type: GameType,
    args: {
        timestamp: {
            name: 'Timestamp of Pattern',
            type: new GraphQLNonNull(GraphQLID),
        },
        gameId: {
            name: 'Game ID to make changes to',
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve (root, { timestamp, gameId }) {
        const db = new PouchDB('http://localhost:5984/games');

        function deltaPattern (doc) {
            const index = doc.patterns.findIndex(x => x.timestamp === timestamp);
            if (index > -1) {
                doc.patterns.splice(index, 1);
            } else {
                return false;
            }
            return doc;
        }

        return db.upsert(gameId, deltaPattern).then(() => db.get(gameId)).then(doc => doc);
    },
};

export default removePattern;
