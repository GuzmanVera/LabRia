import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  form!: FormGroup;
  token!: string;
  email!: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    this.email = this.route.snapshot.queryParamMap.get('email')!;
  
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  
  
  onSubmit() {
    if (this.form.valid) {
      const password = this.form.get('password')!.value;
      const confirmPassword = this.form.get('confirmPassword')!.value;
  
      this.authService.restorePassword(this.email, this.token, password, confirmPassword)
        .subscribe(
          () => {
            this.snackBar.open('Contraseña restablecida con éxito', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/']);
          },
          error => this.snackBar.open('Error al restablecer la contraseña: ' + error.message, 'Cerrar', { duration: 3000 })
        );
    }
  }
}
