import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
// import formValues 可以读取当前表单的 value。当表单子组件的 onChange 依赖于当前表单里的值，很有用。

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
  } 
  submitFunc(values) {
    console.log("点击提交: " + JSON.stringify(values))
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    let disabled = true;
    return (
      // <form onSubmit={handleSubmit(this.submitFunc)}> 在当前页面操作
      // 传给其他组件操作
       <form onSubmit={handleSubmit}> 
        <div>
          <label>First Name</label>
          <div>
            <Field name="firstName" component="input" type="text" placeholder="First Name" disabled = {disabled}/>
          </div>
        </div>

        <div>
          <label>Last Name</label>
          <div>
            <Field name="lastName" component="input" type="text" placeholder="Last Name" />
          </div>
        </div>

        <div>
          <label>Email</label>
          <div>
            <Field name="email" component="input" type="email" placeholder="Email" />
          </div>
        </div>

     
        <div>
          <label>date</label>
          <div>
            <Field name="date" component="input" type="date" placeholder="date" />
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field name="sex" component="input" type="radio" value="male" />
              {' '}
              Male
            </label>
            <label>
              <Field name="sex" component="input" type="radio" value="female" />
              {' '}
              Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" component="select">
              <option />
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            
            <label> red <Field name="color" component="input" type = "checkbox" />  {' '}</label>
            <label>  yellow <Field name="color" component="input" type = "checkbox" />  {' '}</label>

            
          </div>
        </div>
        <div>
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
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
 }
  
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
  onChange : function(){
    console.log("改动中");
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