interface SignUpRequest {
  firstName:    string;
  lastName:     string;
  email:        string;
  age:          string | number | boolean | undefined;
  password:     string;
  role:         string;
}
export default SignUpRequest;
