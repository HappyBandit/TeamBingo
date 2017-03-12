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
import clone from 'lodash/clone';
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
        return db.get(gameId).then((result) => {
            const numBoxes = result.config.columns * result.config.rows;

            const boxes = clone(result.boxes);

            while (boxes.length < numBoxes) {
                boxes.push({ text: '', active: true });
            }

            const board = {
                name,
                boxes: sampleSize(boxes, numBoxes),
                timestamp,
            };

            if (result.boards) {
                result.boards.push(board);
            } else {
                result.boards = [board];
            }

            return db.put(result);
        }).then(result => db.get(result.id)).then(doc => doc.boards.find(x => x.timestamp === timestamp));
    },
};

export default createBoard;
