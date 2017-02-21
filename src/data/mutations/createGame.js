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
    },
    resolve (root, { name, type }) {
        const db = new PouchDB('http://localhost:5984/games');
        console.log(`Name: ${name}, Type: ${type}`);

        const docInput = {
            name,
            type,
        };
        return db.post(docInput).then((result) => {
            console.log(`Result: ${JSON.stringify(result)}`);
            return db.get(result.id);
        }).then(doc => doc);
    },
};

export default createGame;
