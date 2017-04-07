# Form

In this section, we will see how to create a form. To illustrate, we will consider a form where a user can edit his personnal information : First Name, Last Name and Email.

The complete source code is available here : `/src/components/FormPersonnalInfo/FormPersonnalInfo.js`

## Getting Started

Create a new component using the yo generator. The component's name should start with 'Form'. This will help to locate all forms in the project. 

```
yo retax:component FormPersonnalInfo
```

The Generator created a new folder called `FormPersonnalInfo ` in `/components`.

## Component structure

### Props

Declare the component props. In our case it will be :

```
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func,
    refresh: PropTypes.func,
  };
```

`user` is the user object fetched from the API. It may be contain existing values for our form.

`updateUser ` is the function that allow us to update the user.

`refresh ` is the function to refresh the environment.

### Form's structure

In the constructor function, declare the form's structure like this:

```
const form = {
      firstName: {
        component: 'TextField',
        key: `firstName_${user._key}`,
        type: 'text',
        labelText: 'First Name',
        hintText: 'Enter your First Name',
        value: user.firstName,
        regex: NOT_NULL,
        regexError: 'Required',
        error: undefined,
      },
      lastName: {
        component: 'TextField',
        key: `lastName_${user._key}`,
        type: 'text',
        labelText: 'Last Name',
        hintText: 'Enter your Last Name',
        value: user.lastName,
        regex: NOT_NULL,
        regexError: 'Required',
        error: undefined,
      },
      email: {
        component: 'TextField',
        key: `email_${user._key}`,
        type: 'text',
        labelText: 'Email',
        hintText: 'Enter your email',
        value: user.email,
        regex: EMAIL,
        regexError: 'Incorrect Email',
        error: undefined,
      },
    };
```

Our form will contain 3 TextField. For each field, you have to specify :

* `component` (required) : The Material UI component you'll use.
* `key` (required): A unique ID.
* `type` (required): `Text` or `Password`.
* `display`: Hide or not the field.
* `disable`: Disabled or not the field.
* `labelText ` : Title above the input.
* `hintText ` : Placeholder.
* `value `: Value, here you can set the fetched value.
* `regex`: If the value has to be in a specific shape (eg : email), select the regex here.
* `regexError `: Set the error message you want to display to the user if the regex test is false.
* `error `: Current error message displayed to the user.

Declare you custom regexp in the `constants/regexp` and import it in your component.
Example : to check the email, I declared the constant `EMAIL`.

Save this form object in the component's state.

### Usefull state value

In addition to the form object, declare these variables :

* `buttonStatus` : (String) The submit status among `editing`, `loading`, `error`, `success`. Depending on this status, the submit button will have different look.
* `hasChanged`: (Bool) Has the user started to fill the form ?
* `isValid` : (Bool) Is the form valid ? (All regexp are true)

### Other functions

Check the source code and take a look at the `form` function. This one is called in the render. Its role is to generate the form based on the form state you provided.
the function is wrapper in a div where onKeyPress is used. Each time the user will press 'enter' and if the form is valid, the submit function will be called (in our case updatePassword).
This function also insert the submit button at the end. You can use this function or edit it to fit your needs.

The `save` function is called everytime the user changes something. It will edit the form state and check if the associated regex is valid. If not, the function will set the state value isValid to false. If true, the function will evaluate the validity of the entire form and set true if it is the case.

Here you can add custom behavior or more complex conditions. For instance if you want to show or hide a field depending on the value of some entries.
Check the component `FormPassword` : based on the checkbox, we display or not the password. `handleShowPassword` is called during the saving process to edit the form's state.


