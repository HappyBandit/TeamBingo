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
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const BoxItemType = new ObjectType({
    name: 'BoxItem',
    description: 'The Individual Boxes on a Game Board',
    fields: {
        active: { type: new NonNull(BooleanType) },
        text: { type: new NonNull(StringType) },
    },
});

export default BoxItemType;
