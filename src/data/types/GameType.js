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
    GraphQLBoolean as BoolType,
    GraphQLNonNull as NonNull,
    GraphQLList as List,
    GraphQLID as IdType,
} from 'graphql';
import BoxIemType from './BoxItemType';
import BoardItemType from './BoardItemType';
import ConfigType from './ConfigType';
import PatternItemType from './PatternItemType';

const GameType = new ObjectType({
    name: 'Game',
    description: 'A Game',
    fields: {
        _id: { type: IdType },
        type: { type: new NonNull(IntegerType) },
        bingo: { type: BoolType },
        name: { type: new NonNull(StringType) },
        boxes: { type: new List(BoxIemType) },
        boards: {
            type: new List(BoardItemType),
            args: {
                timestamp: {
                    type: IdType,
                },
            },
            resolve (parent, { timestamp }) {
                let resp;
                if (timestamp) {
                    resp = parent.boards.filter(x => x.timestamp === timestamp);
                } else {
                    resp = parent.boards;
                }

                return resp;
            },
        },
        config: { type: ConfigType },
        patterns: { type: new List(PatternItemType) },
    },
});

export default GameType;
