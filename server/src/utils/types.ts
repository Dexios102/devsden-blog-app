export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GoogleAuthRequest {
  username: string;
  email: string;
  profilePic: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
