/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $ b:true */

import React, { PropTypes } from 'react';
import Form from 'react-formal';
import yup from 'yup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewBoard.css';
import graphQlFetch from '../../../../core/graphQlFetch';
import history from '../../../../core/history';

const modelSchema = yup.object({
    name: yup.string().required('Please enter a Board Name'),
});

class NewBoard extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        id: '',
    };

    constructor (props) {
        super(props);

        this.SubmitForm = this.SubmitForm.bind(this);
        this.goToGame = this.goToGame.bind(this);
    }

    goToGame (timestamp) {
        history.push(`/game/${this.props.id}/board/${timestamp}`);
    }

    SubmitForm (event) {
        graphQlFetch(`mutation{createBoard(name:"${event.name}",gameId:"${this.props.id}"){timestamp}}`)
        .then((response) => {
            $('#createModel').modal('hide');
            this.goToGame(response.createBoard.timestamp);
        });
    }

    render () {
        return (
            <div>
                <button
                    className="btn btn-primary btn-block"
                    data-toggle="modal"
                    data-target="#createModel"
                >Create Yourself a Board
                </button>
                {/* Modal */}
                <div className="modal fade" id="createModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="myModalLabel">Create a Board for this Game</h4>
                            </div>
                            <div className="modal-body">
                                <Form
                                    schema={modelSchema}
                                    defaultValue={modelSchema.default()}
                                    onSubmit={this.SubmitForm}
                                >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Form.Field
                                                type="text"
                                                className="form-control"
                                                placeholder="Board Name"
                                                name="name"
                                                errorClass={s.hasError}
                                            />
                                            <Form.Message for="name" errorClass={s.errorMessage} />
                                        </div>
                                    </div>
                                    <Form.Button
                                        className="btn btn-primary btn-block"
                                        type="submit"
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

export default withStyles(s)(NewBoard);
