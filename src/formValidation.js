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
  input.classList.add('error');
  errorElement.classList.add('visible');
  input.focus();
}

function resetInput(input, errorText) {
  input.classList.remove('valid', 'error');
  errorText.classList.remove('visible');
}

export { onInput, showInputError, resetInput };
