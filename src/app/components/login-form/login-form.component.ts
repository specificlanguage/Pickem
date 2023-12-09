import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "@angular/fire/auth";
import {Router} from "@angular/router";

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get("password")
  const confirmed = control.get("confirmPassword")
  return password && confirmed && password.value !== confirmed.value ? {confirmPassword: true} : null;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  auth: Auth = inject(Auth);
  router: Router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    // "displayName": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    // "email": new FormControl("", [Validators.required, Validators.email]),
    // "password": new FormControl("", [Validators.required, Validators.minLength(6)]),
    // "confirmPassword": new FormControl("", [Validators.required])
  }, {validators: [passwordMatchValidator]})

  protected readonly faGoogle = faGoogle;

  onLoginSubmit(form: FormGroup) {
    signInWithEmailAndPassword(this.auth, form.value.email, form.value.password)
      .then(userCredential => {
        console.log(userCredential.user.displayName);
        this.router.navigate([""]);
      })

  }

  onGoogleLogin() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(userCredential => {
        console.log(userCredential.user.displayName)
        this.router.navigate([""]);
      })
  }

}
