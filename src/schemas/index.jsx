import * as Yup from 'yup';
export const SignUpAuth = Yup.object({
  email: Yup.string()
      .min(2, 'Email must be at least 2 characters long')
      .max(50, 'Email can be at most 50 characters long')
      .required('Email is required').email('Invalid email address'),
  fullName: Yup.string()
      .min(2, 'FullName must be at least 2 characters long')
      .max(25, 'FullName can be at most 25 characters long')
      .required('Username is required'),
  password: Yup.string()
      .min(2, 'Password must be at least 2 characters long')
      .max(25, 'Password can be at most 25 characters long')
      .required('Password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must be match')
      .required('Confirm Password is required'),
});

export const SignInAuth = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});
