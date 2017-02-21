/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntegerType,
    GraphQLNonNull as NonNull,
    GraphQLList as List,
    GraphQLID as IdType,
} from 'graphql';
import BoxIemType from './BoxItemType';
import ConfigType from './ConfigType';

const GameType = new ObjectType({
    name: 'Game',
    description: 'A Game',
    fields: {
        _id: { type: IdType },
        type: { type: new NonNull(IntegerType) },
        name: { type: new NonNull(StringType) },
        boxes: { type: new List(BoxIemType) },
        config: { type: ConfigType },
    },
});

export default GameType;
