/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PouchDB from 'pouchdb';
import sampleSize from 'lodash/sampleSize';
import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import BoardItemType from '../types/BoardItemType';

const createBoard = {
    type: BoardItemType,
    args: {
        name: {
            name: 'Name of Board',
            type: new GraphQLNonNull(GraphQLString),
        },
        gameId: {
            name: 'Game ID to make board from',
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve (root, { name, gameId }) {
        const db = new PouchDB('http://localhost:5984/games');
        const timestamp = Date.now().toString();

        function deltaBoard (doc) {
            const numBoxes = doc.config.columns * doc.config.rows;

            const boxes = doc.boxes.filter(x => x.active);

            while (boxes.length < numBoxes) {
                boxes.push({ text: '', active: true });
            }

            const board = {
                name,
                boxes: sampleSize(boxes, numBoxes),
                timestamp,
            };

            if (doc.boards) {
                doc.boards.push(board);
            } else {
                doc.boards = [board];
            }
            return doc;
        }

        return db.upsert(gameId, deltaBoard)
        .then(() => db.get(gameId))
        .then(doc => doc.boards.find(x => x.timestamp === timestamp));
    },
};

export default createBoard;
