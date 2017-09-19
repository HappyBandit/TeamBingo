import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Add.css';
import graphQlFetch from '../../../../../../core/graphQlFetch';

class Add extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onAdd: PropTypes.func.isRequired,
        config: PropTypes.shape({
            columns: PropTypes.number,
            rows: PropTypes.number,
        }).isRequired,
    };

    constructor (props) {
        super(props);

        this.addPattern = this.addPattern.bind(this);
        this.handleIndexChange = this.handleIndexChange.bind(this);

        this.state = {
            active: true,
            indexes: new Array(this.props.config.columns * this.props.config.rows).fill(false),
        };
    }

    handleIndexChange (event) {
        const target = event.target;
        const checked = target.checked;
        const index = target.dataset.index;
        const { indexes } = this.state;
        indexes[index] = checked;
        this.setState({ indexes });
    }

    addPattern () {
        if (this.state.indexes.includes(true)) {
            graphQlFetch(`mutation{addPattern(id:"${this.props.id}",pattern:{indexes:[${this.state.indexes}],active:${this.state.active}}){patterns{indexes,active,timestamp}}}`)
            .then((resp) => {
                this.props.onAdd(resp.addPattern.patterns);
                const { indexes } = this.state;
                indexes.fill(false);
                this.setState({ indexes });
            });
        }
    }

    render () {
        return (
            <div className={`form-inline ${s.inline}`}>
                <div className="form-group">
                    <label htmlFor="text-add">Pattern:</label>
                    <div>
                        {this.state.indexes.map((item, index) => (
                            <div
                                key={index}
                                className="checkbox"
                                style={{ width: `${(100 / this.props.config.columns)}%` }}
                            >
                                <label htmlFor={`#pattern-${index}`}>
                                    <input
                                        id={`pattern-${index}`}
                                        name={`#pattern-${index}`}
                                        type="checkbox"
                                        className={`form-control ${s.patternCheck}`}
                                        onChange={this.handleIndexChange}
                                        checked={item}
                                        data-index={index}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="btn btn-success"
                    onClick={this.addPattern}
                >
                    Add
                </button>
            </div>
        );
    }
}

export default withStyles(s)(Add);
