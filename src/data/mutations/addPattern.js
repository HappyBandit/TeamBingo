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
import PatternInputType from '../types/PatternInputType';

const addPattern = {
    type: GameType,
    args: {
        id: {
            name: 'Game ID to make changes to',
            type: new GraphQLNonNull(GraphQLString),
        },
        pattern: {
            name: 'New pattern values',
            type: new GraphQLNonNull(PatternInputType),
        },
    },
    resolve (root, { id, pattern }) {
        const db = new PouchDB('http://localhost:5984/games');

        function deltaPattern (doc) {
            pattern.timestamp = Date.now().toString();

            if (doc.patterns) {
                doc.patterns.push(pattern);
            } else {
                doc.patterns = [pattern];
            }
            return doc;
        }

        return db.upsert(id, deltaPattern).then(() => db.get(id)).then(doc => doc);
    },
};

export default addPattern;
