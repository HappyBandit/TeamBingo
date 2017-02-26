/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Create.css';

class Create extends React.Component {

    render () {
        return (
            <div className={s.root}>
                <button data-toggle="modal" data-target="#createModel">Create New Game</button>
                {/* Modal */}
                <div className="modal fade" id="createModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Create a Game</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Game Name" />
                                    </div>
                                    <div className="col-md-6">
                                        <select className="form-control">
                                            <option value="-1">Select a Starting Type</option>
                                            <option value="0">Traditional</option>
                                            <option value="1">Managed</option>
                                            <option value="2">Unmanaged</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Create);
