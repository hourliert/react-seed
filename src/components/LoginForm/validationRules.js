export default (values) => {
  const errors = {};
  const { email, password } = values;

  if (!email) {
    errors.email = 'Required';
  } else if (email.length < 1) {
    errors.email = 'Too short';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 2) {
    errors.password = 'Too short';
  }

  return errors;
};
