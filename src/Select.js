import React from 'react';

const errors = [];

class Input extends React.Component {
    state= {selected: this.props.value}

    minMax(min, max, val, name) {

        if (val.length < min) {
            errors.push({name, message: 'Min error'});
        }

        if (val.length > max) {
            errors.push({name, message: 'Max error'});
        }
    }

    isRequired(required, val, name) {

        if (required && !val) {
            errors.push({name, message: 'Required field'});
        }
    }

    dataType(type, val, name) {

        if (!type.includes(typeof val)) {
            errors.push({name, message: 'Bad data type'});
        }
    }
    handleOnChange = (e) => {
        this.minMax(this.props.min, this.props.max, e.currentTarget.value, e.currentTarget.name);
        this.isRequired(this.props.required, e.currentTarget.value, e.currentTarget.name);
        this.dataType(this.props.dataType, e.currentTarget.value, e.currentTarget.name)

        if (errors.length) {
            return this.props.handleInputBtn(errors);
        }

        this.setState({selected: e.currentTarget.value});
        this.props.handleInputBtn({[e.currentTarget.name]: e.currentTarget.value});
    }

    render() {
        return(
            <div>
                <label>
                    {this.props.title}
                    <select name={this.props.name} value={this.state.selected} onChange={this.handleOnChange}>
                        <option value="status first">status first</option>
                        <option value="status second">status second</option>
                        <option value="status third">status third</option>
                    </select>
                </label>
            </div>
        );
    }
}

export default Input;
