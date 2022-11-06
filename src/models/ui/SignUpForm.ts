interface SignUpForm {
  firstName:       string;
  lastName:        string;
  email:           string;
  age:             string | number | boolean | undefined;
  password:        string;
  passwordConfirm: string;
  role:            string;
}
export default SignUpForm;
