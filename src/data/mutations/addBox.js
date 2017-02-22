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

        return db.get(id).then((result) => {
            if (result.boxes) {
                result.boxes.push(box);
            } else {
                result.boxes = [box];
            }
            return db.put(result);
        }).then(result => db.get(result.id)).then(doc => doc);
    },
};

export default addBox;
