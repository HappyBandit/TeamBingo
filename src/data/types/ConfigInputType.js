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
    GraphQLInt as IntegerType,
    GraphQLBoolean as BoolType,
} from 'graphql';

const ConfigInputType = new ObjectInputType({
    name: 'ConfigInput',
    description: 'The Configuration Input of a Game',
    fields: {
        columns: { type: IntegerType },
        rows: { type: IntegerType },
        freeSpace: { type: BoolType },
    },
});

export default ConfigInputType;
