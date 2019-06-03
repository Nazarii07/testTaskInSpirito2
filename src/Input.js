import React from 'react';

const errors = [];

class Input extends React.Component {
    state = {errors: []}

    minMax(min, max, val, name) {
        if (val.length < min) {
            errors.push({name, message: 'Min error'});
        }

        if (val.length > max) {
            errors.push({name, message: 'Max error'});
        }

        this.setState({errors});
    }

    isRequired(required, val, name) {

        if (required && !val) {
            errors.push({name, message: 'Required field'});
        }

        this.setState({errors});
    }

    dataType(type, val, name) {
        if (!type.includes(typeof val)) {
            errors.push({name, message: 'Bad data type'});
        }

        this.setState({errors});
    }

    handleOnChange = (e) => {
        //this.minMax(this.props.min, this.props.max, e.currentTarget.value, e.currentTarget.name);
        // this.isRequired(this.props.required, e.currentTarget.value, e.currentTarget.name);
        //this.dataType(this.props.dataType, e.currentTarget.value, e.currentTarget.name)

        if (!errors.length) {
            this.props.handleInputBtn({[e.currentTarget.name]: e.currentTarget.value});
        }
    }

    renderError() {
        return errors.map((err) => {
            return <div>
                <span>{err.name}:</span>
                <span>{err.message}</span>
            </div>
        })
    }

    render() {
        return(
            <div>
                <label>
                    {this.props.title}
                    <input name={this.props.name} value={this.props.value} onChange={this.handleOnChange} />
                </label>
                {this.renderError()}
            </div>
        );
    }
}

export default Input;
