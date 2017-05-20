export function formIsValid(form) {
  let isValid = true;

  for (const k in form) {
    if (form.hasOwnProperty(k)) {
      const field = form[k];
      if (field.error !== undefined) {
        isValid = false;
      }
    }
  }

  return isValid;
}
