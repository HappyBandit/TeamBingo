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
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const BoxInputType = new ObjectInputType({
    name: 'BoxInput',
    description: 'The Box Input of a Game',
    fields: {
        text: { type: new NonNull(StringType) },
        active: { type: new NonNull(BooleanType) },
    },
});

export default BoxInputType;
