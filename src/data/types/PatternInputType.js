/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
    GraphQLInputObjectType as ObjectInputType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List,
} from 'graphql';

const PatternInputType = new ObjectInputType({
    name: 'PatternInput',
    description: 'The Pattern Input of a Game',
    fields: {
        indexes: { type: new List(BooleanType) },
        active: { type: BooleanType },
    },
});

export default PatternInputType;
