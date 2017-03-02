/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PouchDB from 'pouchdb';
import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import GameType from '../types/GameType';

const createGame = {
    type: GameType,
    args: {
        name: {
            name: 'Game Name',
            type: new GraphQLNonNull(GraphQLString),
        },
        type: {
            name: 'Game Type',
            type: new GraphQLNonNull(GraphQLInt),
        },
        email: {
            name: 'Email of Host',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve (root, { name, type, email }) {
        const db = new PouchDB('http://localhost:5984/games');

        const docInput = {
            name,
            type,
            email,
        };
        return db.post(docInput).then(result => db.get(result.id)).then(doc => doc);
    },
};

export default createGame;
