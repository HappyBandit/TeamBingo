/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PouchDB from 'pouchdb';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import GameType from '../types/GameType';
import BoxInputType from '../types/BoxInputType';

const addBox = {
    type: GameType,
    args: {
        id: {
            name: 'Game Id',
            type: new GraphQLNonNull(GraphQLString),
        },
        box: {
            name: 'New box values',
            type: new GraphQLNonNull(BoxInputType),
        },
    },
    resolve (root, { id, box }) {
        const db = new PouchDB('http://localhost:5984/games');

        function deltaBox (doc) {
            box.timestamp = Date.now().toString();

            if (doc.boxes) {
                doc.boxes.push(box);
            } else {
                doc.boxes = [box];
            }
            return doc;
        }

        return db.upsert(id, deltaBox).then(() => db.get(id)).then(doc => doc);
    },
};

export default addBox;
