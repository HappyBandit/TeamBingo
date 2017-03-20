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
import BoxInputType from '../types/BoxInputType';

PouchDB.plugin(require('pouchdb-upsert'));

const updateBox = {
    type: GameType,
    args: {
        timestamp: {
            name: 'Timestamp of Box',
            type: new GraphQLNonNull(GraphQLID),
        },
        gameId: {
            name: 'Game ID to make board from',
            type: new GraphQLNonNull(GraphQLID),
        },
        box: {
            name: 'New Box values',
            type: BoxInputType,
        },
    },
    resolve (root, { timestamp, gameId, box }) {
        const db = new PouchDB('http://localhost:5984/games');

        function deltaBox (doc) {
            const index = doc.boxes.findIndex(x => x.timestamp === timestamp);
            if (index > -1) {
                Object.assign(doc.boxes[index], box);
            } else {
                throw Error('Box not found');
            }
            return doc;
        }

        return db.upsert(gameId, deltaBox).then(() => db.get(gameId)).then(doc => doc);
    },
};

export default updateBox;
