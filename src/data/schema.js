/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
    GraphQLSchema as Schema,
    GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import game from './queries/game';
import createGame from './mutations/createGame';
import updateConfig from './mutations/updateConfig';

const schema = new Schema({
    query: new ObjectType({
        name: 'Query',
        fields: {
            me,
            news,
            game,
        },
    }),
    mutation: new ObjectType({
        name: 'Mutation',
        fields: {
            createGame,
            updateConfig,
        },
    }),
});

export default schema;
