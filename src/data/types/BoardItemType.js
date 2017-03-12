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
    GraphQLNonNull as NonNull,
    GraphQLList as List,
    GraphQLID as IdType,
} from 'graphql';
import BoxIemType from './BoxItemType';

const BoardItemType = new ObjectType({
    name: 'BoardItem',
    description: 'An Individual Board created from a game',
    fields: {
        name: { type: new NonNull(StringType) },
        boxes: { type: new List(BoxIemType) },
        timestamp: { type: new NonNull(IdType) },
    },
});

export default BoardItemType;
