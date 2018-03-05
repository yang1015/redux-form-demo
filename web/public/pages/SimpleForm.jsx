import React, {Component} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Button} from 'antd-mobile';
import {List, InputItem, DatePicker, Checkbox} from 'antd-mobile';
// import formValues 可以读取当前表单的 value。当表单子组件的 onChange 依赖于当前表单里的值，很有用。

const CheckboxItem = Checkbox.CheckboxItem;

const renderField = ({input, label, type, disabled, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input className="customizedInput" {...input} placeholder={label} type={type} disabled={disabled}/>
            {touched &&
            ((error && <div style={{color: "red", marginBottom: "5px"}}>{error}</div>) ||
                (warning && <div style={{color: "red"}}>{warning}</div>))}
        </div>
    </div>
);

const required = value => (value ? undefined : 'required');


class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
    }

    submitFunc(values) {
        console.log("点击提交: " + JSON.stringify(values))
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            // <form onSubmit={handleSubmit(this.submitFunc)}> 在当前页面操作
            // 传给其他组件操作
            <form onSubmit={handleSubmit}>


                <Field name="firstName"
                       component={NormalInputComponent}
                       label="First Name"
                       type="text" placeholder="first name" validate={[required]}
                />

                <Field name="lastName"
                       component={NormalInputComponent}
                       label="Last Name"
                       type="text" placeholder="last name" validate={[required]}
                />

                <Field name="email"
                       component={NormalInputComponent}
                       label="Email"
                       type="email" placeholder="email" validate={[required]}
                />


                {/*<div className="input_style">*/}
                {/*<label>Email</label>*/}
                {/*<div>*/}
                {/*<Field name="email" component="input" type="email" placeholder="Email"/>*/}
                {/*</div>*/}
                {/*</div>*/}


                {/*<div className="input_style">*/}
                {/*<label>date</label>*/}
                {/*<div>*/}
                {/*<Field name="date" component="input" type="date" placeholder="date"/>*/}
                {/*</div>*/}
                {/*</div>*/}


                <div>
                    <label>Birthday</label>
                    <Field name = "birthday" component = {DatePickerComponent} />
                </div>


                <div className="input_style">
                    <label>Sex</label>
                    <div>
                        <label>
                            <Field name="sex" component="input" type="radio" value="male"/>
                            {' '}
                            Male
                        </label>
                        <label>
                            <Field name="sex" component="input" type="radio" value="female"/>
                            {' '}
                            Female
                        </label>
                    </div>
                </div>


                <div>
                    <label>Favorite Color</label>
                    <div>
                        <FieldArray name="favoriteColor" component={CheckboxComponent} optionsArray = {["red", "yellow", "green"]}/>
                    </div>
                </div>



                <div className="input_style">
                    <label htmlFor="employed">Employed</label>
                    <div>
                        <Field
                            name="employed"
                            id="employed"
                            component="input"
                            type="checkbox"
                        />
                    </div>
                </div>
                <div className="input_style">
                    <label>Notes</label>
                    <div>
                        <Field name="notes" component="textarea"/>
                    </div>
                </div>
                <div>
                    {/*cannot use <Button> directly, need add style instead of using antd component*/}
                    <button type="submit">Submit</button>
                    {/*<Button type="button" disabled={pristine || submitting} onClick={reset}>*/}
                    {/*Clear Values*/}
                    {/*</Button>*/}
                </div>

            </form>
        );
    }

};

export default reduxForm({
    form: 'simple', // a unique identifier for this form
    onChange: function (e) {
        console.log("form onchange: " + JSON.stringify(e));
    }
})(SimpleForm);

/*
相当于三步：

1.先配置好一个你想create的Redux form with the unique key:
  createReduxForm = reduxForm({ form: 'simple' })
2.再把上面create好的redux form放入create redux form的函数里 真正的 create it
  SimpleForm = createReduxForm( SimpleForm )
3.导出
  export default SimpleForm;
*/

class NormalInputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNormalInputComponentChange(e) {
        if (this.props.input.onChange) {
            this.props.input.onChange(e);
        }
    }

    render() {
        return (
            <List>
                <InputItem placeholder="auto focus"
                           onChange={(e) => this.handleNormalInputComponentChange(e)}>
                    {this.props.label}
                </InputItem>
            </List>
        )
    }
}

class DatePickerComponent extends React.Component {
    handleDatePickerComponentChange(e) {
        if (this.props.input.onChange) {
            this.props.input.onChange(e);
        }
    }
    render() {
        return (
            <DatePicker
                mode="date"
                title="Select Date"
                extra="Optional"
                style={{width: "200px"}}
                onChange = {(e) => this.handleDatePickerComponentChange(e)}
            />
        )
    }
}

class CheckboxComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange(value) {
        alert("!");
        console.log(value)
        //this.props.input.onChange(e);
    }
    render() {
        return (
            <List>
                {
                    this.props.optionsArray.map(function(each, index) {
                        return (
                            <CheckboxItem key = {each} onChange={() => this.onChange(each)}>
                                {each}
                            </CheckboxItem>
                        )
                    })
                }
            </List>
        )
    }
}

