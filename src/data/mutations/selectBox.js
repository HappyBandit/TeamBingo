/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PouchDB from 'pouchdb';
import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import BoxItemType from '../types/BoxItemType';

const selectBox = {
    type: BoxItemType,
    args: {
        gameId: {
            name: 'Game Id',
            type: new GraphQLNonNull(GraphQLID),
        },
        boxTimestamp: {
            name: 'Box Timestamp',
            type: new GraphQLNonNull(GraphQLID),
        },
        selected: {
            name: 'Is the box selected',
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        boardTimestamp: {
            name: 'If added which specific board. Used for un-managed',
            type: GraphQLID,
        },
    },
    resolve (root, { gameId, boxTimestamp, selected, boardTimestamp }) {
        const db = new PouchDB('http://localhost:5984/games');

        function updateBox (boxes) {
            const box = boxes.find(x => x.timestamp === boxTimestamp);
            if (box) {
                box.selected = selected;
            }
        }

        function deltaBox (doc) {
            let item;

            if (boardTimestamp) {
                item = doc.boards.find(x => x.timestamp === boardTimestamp);
            } else {
                item = doc;
            }

            if (item) {
                updateBox(item.boxes);

                if (item.boards) {
                    item.boards.forEach((board) => {
                        updateBox(board.boxes);
                    });
                }
            }

            return doc;
        }

        return db.upsert(gameId, deltaBox).then(() => db.get(gameId)).then((doc) => {
            let item;
            let box;

            if (boardTimestamp) {
                item = doc.boards.find(x => x.timestamp === boardTimestamp);
            } else {
                item = doc;
            }

            if (item) {
                box = item.boxes.find(x => x.timestamp === boxTimestamp);
            }

            return box;
        });
    },
};

export default selectBox;
