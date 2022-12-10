function onInput(input, isValid, errorText) {
  const { classList: inputClassList } = input;
  // if input is in error state and changed to valid, add valid class
  if (isValid && inputClassList.contains('error')) {
    inputClassList.add('valid');
    inputClassList.remove('error');
    errorText.classList.remove('visible');
  } else if (!isValid && inputClassList.contains('valid')) {
    inputClassList.remove('valid');
    inputClassList.add('error');
    errorText.classList.add('visible');
  }
}

function showInputError(input, errorElement) {
  console.log(input, errorElement);
  input.classList.add('error');
  errorElement.classList.add('visible');
  input.focus();
}

function resetAllErrors() {
  const inputs = document.querySelectorAll('input.error');
  const errorElements = document.querySelectorAll('.error-text.visible');
  inputs.forEach((input) => input.classList.remove('error'));
  errorElements.forEach((errorElement) =>
    errorElement.classList.remove('visible')
  );
}

export { onInput, showInputError, resetAllErrors };
