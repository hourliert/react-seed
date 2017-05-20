export default [
  {
    key: 'firstName',
    name: 'First Name',
    type: 'input',
    placeHolder: 'Enter your first name',
    validationRules: [
      {
        regex: '(?=.{1,})',
        errorMessage: 'Required',
      },
    ],
  },
  {
    key: 'lastName',
    name: 'Last Name',
    type: 'input',
    placeHolder: 'Enter your last name',
    validationRules: [
      {
        regex: '(?=.{1,})',
        errorMessage: 'Required',
      },
    ],
  },
  {
    key: 'email',
    name: 'Email',
    type: 'input',
    placeHolder: 'Enter your email',
    validationRules: [
      {
        regex: '(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))',
        errorMessage: 'Incorrect email format',
      },
    ],
  },
];
