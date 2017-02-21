/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PouchDB from 'pouchdb';
import { GraphQLString, GraphQLList as List } from 'graphql';
import GameType from '../types/GameType';

const game = {
    type: new List(GameType),
    args: {
        id: {
            name: 'Game ID',
            type: GraphQLString,
        },
    },
    resolve (root, { id }) {
        const db = new PouchDB('http://localhost:5984/games');
        if (id) {
            return db.get(id).then(doc => [doc]);
        }
        return db.allDocs({
            include_docs: true,
        }).then(docs => docs.rows.map(item => item.doc));
    },
};

export default game;
