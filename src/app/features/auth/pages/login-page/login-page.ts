import { Component } from '@angular/core';
import { Logo } from "../../components/logo/logo";

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [Logo, RouterOutlet],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

}
