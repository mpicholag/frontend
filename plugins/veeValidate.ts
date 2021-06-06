import { extend } from 'vee-validate';
import {
  required,
  min,
  email,
  confirmed,
  is_not as isNot,
} from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} es requerido',
});

extend('min', {
  ...min,
  message: 'The {_field_} must have at least {length} characters',
  params: ['length'],
});

extend('confirmed', {
  ...confirmed,
  message: 'The {_field_} does not match',
});

extend('isNot', {
  ...isNot,
  message: 'The {_field_} should not be equal to the previous',
});

extend('email', {
  ...email,
  message: 'The {_field_} should not be email',
});

extend('isWeakPassword', {
  validate: () => {
    return false;
  },
  message: 'This password is not secure. Try using a long password that combines numbers, symbols and letters.',
});
