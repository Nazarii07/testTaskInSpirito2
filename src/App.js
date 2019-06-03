import React from 'react';
import Input from './Input';
import Select from './Select';

const defaultItem = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    status: '',
    zipCode: ''
};

const errors = [];
class App extends React.Component {
    state = {
        tableList: [],
        item: {
            name: '',
            address1: '',
            address2: '',
            city: '',
            status: '',
            zipCode: ''
        },
        errors: []
    }

    minMax(options) {
        const { min, max, val, name } = options;

        if (val.length < min) {
            errors.push({name, message: 'Min error'});
        }

        if (val.length > max) {
            errors.push({name, message: 'Max error'});
        }
    }

    isRequired(options) {
        const { required, val, name } = options;

        if (required && !val) {
            errors.push({name, message: 'Required field'});
        }
    }

    dataType(options) {
        const { type, val, name } = options;

        if (!type.includes(typeof val)) {
            errors.push({name, message: 'Bad data type'});
        }
    }

    handleInputBtn = (val) => {
        this.setState({item: Object.assign(this.state.item, val)})
    }

    handleOk = () => {
        const { tableList } = this.state;

        tableList.push({...this.state.item});

        this.setState({...tableList, item: {...defaultItem}});
    }

    handleCancel = () => {
        this.setState({item: {...defaultItem}});
    }

    renderList() {
        return this.state.tableList.map((item, index) => {
            return <div >
                <table>
                    <thead className="container">
                        <tr key={index} className="row info">
                            <td className="col-xl-2">{item.name}</td>
                            <td className="col-xl-2">{item.address1}</td>
                            <td className="col-xl-2">{item.address2}</td>
                            <td className="col-xl-2">{item.city}</td>
                            <td className="col-xl-2">{item.status}</td>
                            <td className="col-xl-2">{item.zipCode}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    {/* <label for="in1">Name </label> */}
                        <Input 
                            title="Name"
                            name="name"
                            required={true}
                            min={1}
                            max={100}
                            dataType={['string']}
                            value={this.state.item.name}
                            handleInputBtn={this.handleInputBtn}
                            id="in1"
                        />
                    {/* <label for="in2">Address 1</label> */}
                        <Input 
                            title="Address 1"
                            name="address1"
                            required={true}
                            min={1}
                            max={100}
                            dataType={['string', 'number']}
                            value={this.state.item.address1}
                            handleInputBtn={this.handleInputBtn}
                            id="in2"
                        />
                    <Input 
                        title="Address 2"
                        name="address2"
                        required={false}
                        min="1"
                        max="100"
                        dataType={['string', 'number']}
                        value={this.state.item.address2}
                        handleInputBtn={this.handleInputBtn}
                        pattern
                        placeholder = "User Address(not necessarily)"
                    />
                    <Input 
                        title="City"
                        name="city"
                        required={true}
                        min={1}
                        max={100}
                        dataType={['string']}
                        value={this.state.item.city}
                        handleInputBtn={this.handleInputBtn}
                        pattern={true}
                        placeholder = "User City"
                    />
                    <Select 
                        title="Status"
                        name="status"
                        required={true}
                        min={1}
                        max={100}
                        dataType={['string']}
                        value={this.state.item.name}
                        handleInputBtn={this.handleInputBtn}
                        pattern
                        placeholder = "User Status"
                    />
                    <Input 
                        title="Zip Code"
                        name="zipCode"
                        required={true}
                        min={1}
                        max={100}
                        dataType={['number']}
                        value={this.state.item.zipCode}
                        handleInputBtn={this.handleInputBtn}
                        pattern
                        placeholder = "ZIP"
                    />
                </div>
                <div className="button">
                    <button onClick={this.handleOk} className="ok">Ok</button>
                    <button onClick={this.handleCancel} className="canc">Cancel</button>
                </div>
                <div>
                    <table>
                        <thead className="container">
                            <tr className="row info">
                                <th className="col-xl-2">Name</th>
                                <th className="col-xl-2">Address 1</th>
                                <th className="col-xl-2">Address 2</th>
                                <th className="col-xl-2">City</th>
                                <th className="col-xl-2">State</th>
                                <th className="col-xl-2">Zip Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderList() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default App;