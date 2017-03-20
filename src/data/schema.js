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
import game from './queries/game';
import createGame from './mutations/createGame';
import createBoard from './mutations/createBoard';
import updateConfig from './mutations/updateConfig';
import addBox from './mutations/addBox';
import deleteBoard from './mutations/deleteBoard';
import removeBox from './mutations/removeBox';
import deleteGame from './mutations/deleteGame';
import selectBox from './mutations/selectBox';
import updateBox from './mutations/updateBox';

const schema = new Schema({
    query: new ObjectType({
        name: 'Query',
        fields: {
            me,
            game,
        },
    }),
    mutation: new ObjectType({
        name: 'Mutation',
        fields: {
            createGame,
            updateConfig,
            addBox,
            createBoard,
            deleteBoard,
            removeBox,
            deleteGame,
            selectBox,
            updateBox,
        },
    }),
});

export default schema;
