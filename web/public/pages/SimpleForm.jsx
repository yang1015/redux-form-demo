import React, {Component} from 'react';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Button} from 'antd-mobile';
import {List, InputItem, DatePicker, Checkbox, TextareaItem} from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
// import formValues 可以读取当前表单的 value。当表单子组件的 onChange 依赖于当前表单里的值，很有用。

/*
* text input ✔️√
* radio ✔️√
* checkbox
* date
* textarea √
* multiple select
* */
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
        this.state = {
            sex: 1
        }
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
                       type="text"
                       validate={[required]}
                />

                <Field name="lastName"
                       component={NormalInputComponent}
                       label="Last Name"
                       type="text"
                       validate={[required]}
                />

                <Field name="email"
                       component={NormalInputComponent}
                       label="Email"
                       type="email"
                       validate={[required]}
                />


                <Field name="birthday" type="date" component={DatePickerComponent} label="Birthday"/>

                <div className="form_line_style text_size_normal"
                     style={{
                         display: "flex",
                         alignItems: "baseline",
                         justifyContent: "space-between"
                     }}>
                    <label>Sex</label>
                    <div className="customizedRadio">

                        <Field
                            name="sex"
                            component="input"
                            type="radio"
                            value="male"
                            id="male"
                        />{' '}
                        <label htmlFor="male"> Male</label>

                        <Field
                            name="sex"
                            component="input"
                            type="radio"
                            value="female"
                            id="female"
                        />{' '}
                        <label htmlFor="female"> Female</label>
                    </div>
                </div>


                <div className="text_size_normal">
                    <label style={{paddingLeft: "15px"}}>Favorite Color</label>

                    <FieldArray name="favoriteColor"
                                component={CheckboxComponent}
                                optionsArray={["red", "yellow", "green"]}/>

                </div>


                <div className="text_size_normal" style={{paddingLeft: "15px"}}>
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

                <div className="text_size_normal">
                    <label style={{paddingLeft: "15px"}}>Notes</label>
                    <div>
                        <Field name="notes" component={TextareaComponent}/>
                    </div>
                </div>

                <div>
                    {/*cannot use <Button> directly, need add style instead of using antd component*/}
                    <button type="submit" disabled={submitting}>Submit</button>
                    <Button type = "primary">aaa</Button>
                    {/*<Button type="button" disabled={pristine || submitting} onClick={reset}>*/}
                    {/*Clear Values*/}
                    {/*</Button>*/}
                </div>

                {/*<Button type="primary">888</Button>*/}

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
                <InputItem placeholder={this.props.label} onChange={(e) => this.handleNormalInputComponentChange(e)}>
                    {this.props.label}
                </InputItem>
            </List>
        )
    }
}

class DatePickerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDatePickerComponentChange(e) {
        if (this.props.input.onChange) {
            this.props.input.onChange(e);
        }
    }

    render() {
        return (
            <DatePicker
                mode="date"
                title={"Select" + this.props.label}
                extra="please select"
                onChange={(e) => this.handleDatePickerComponentChange(e)}
            >
                {/*没有list item会不显示的*/}
                <List.Item arrow="horizontal">
                    {this.props.label}
                </List.Item>

            </DatePicker>
        )
    }
}

class CheckboxComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange(value) {
        alert("!");
        // console.log(value)
        //this.props.input.onChange(e);
    }

    render() {
        return (
            <List>
                {
                    this.props.optionsArray.map(function (each, index) {
                        return (
                            <CheckboxItem key={each} onChange={() => this.onChange(each)}>
                                {each}
                            </CheckboxItem>
                        )
                    })
                }
            </List>
        )
    }
}


class TextareaComponent extends React.Component {

    handleChange(e) {
        if (this.props.input.onChange) {
            this.props.input.onChange(e);
        }
    }

    render() {
        return (
            <List>
                <TextareaItem
                    autoHeight
                    labelNumber={5}
                    className="textarea_style"
                    onChange={(e) => this.handleChange(e)}
                />
            </List>
        )
    }
}


