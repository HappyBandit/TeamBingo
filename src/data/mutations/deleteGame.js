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
import DefaultType from '../types/DefaultType';

const deleteGame = {
    type: DefaultType,
    args: {
        id: {
            name: 'Game Id',
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve (root, { id }) {
        const db = new PouchDB('http://localhost:5984/games');
        return db.get(id)
        .then(doc => db.remove(doc))
        .then(() => ({ status: 'Success' }))
        .catch(error => ({ status: error.name, errorCode: error.status, errorMessage: error.message }));
    },
};

export default deleteGame;
