/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Form from 'react-formal';
import yup from 'yup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Create.css';

const modelSchema = yup.object({
    name: yup.string().required('please enter a first name'),

    type: yup.number()
        .required('Please select a Game Type'),

    email: yup.string().email('Must be a valid E-mail')
        .required('Please enter an E-mail'),
});

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
                                <Form
                                    schema={modelSchema}
                                    defaultValue={modelSchema.default()}
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Field
                                                type="text"
                                                className="form-control"
                                                placeholder="Game Name"
                                                name="name"
                                                validations={['required']}
                                                errorClassName="error"
                                            />
                                            <Form.Message for="name" />
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Field
                                                className="form-control"
                                                type="select"
                                                name="type"
                                            >
                                                <option value="-1">Select a Starting Type</option>
                                                <option value="0">Traditional</option>
                                                <option value="1">Managed</option>
                                                <option value="2">Unmanaged</option>
                                            </Form.Field>
                                            <Form.Message for="type" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Field
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                validations={['required']}
                                                errorClassName="error"
                                            />
                                            <Form.Message for="email" />
                                        </div>
                                    </div>
                                    <Form.Button
                                        className="btn btn-block"
                                    >
                                        Create
                                    </Form.Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Create);
