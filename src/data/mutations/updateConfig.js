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
import ConfigInputType from '../types/ConfigInputType';

const createGame = {
    type: GameType,
    args: {
        id: {
            name: 'Game Id',
            type: new GraphQLNonNull(GraphQLString),
        },
        config: {
            name: 'New Config values',
            type: new GraphQLNonNull(ConfigInputType),
        },
    },
    resolve (root, { id, config }) {
        const db = new PouchDB('http://localhost:5984/games');

        function deltaConfig (doc) {
            Object.assign(doc.config, { ...config });
            return doc;
        }

        return db.upsert(id, deltaConfig).then(() => db.get(id)).then(doc => doc);
    },
};

export default createGame;
