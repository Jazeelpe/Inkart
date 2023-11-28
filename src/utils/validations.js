import validator from 'validator';

export const isEmailValid = email => {
  return validator.isEmail(email);
};

export const isPhoneNumberValid = phoneNumber => {
  const PhoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  // Check if the phone number is valid
  if (PhoneNumberRegex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};
