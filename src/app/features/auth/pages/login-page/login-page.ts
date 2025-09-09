import { Component, signal } from '@angular/core';
import { Logo } from "../../components/logo/logo";
import { ForgotPassword } from "../forgot-password/forgot-password";
import { SignIn } from "../sign-in/sign-in";
import { CheckIndbox } from "../check-indbox/check-indbox";

@Component({
  selector: 'app-login-page',
  imports: [Logo, ForgotPassword, SignIn, CheckIndbox],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  isForgotPassword = signal(true);
}
