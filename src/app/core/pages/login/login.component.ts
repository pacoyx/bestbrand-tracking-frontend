import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit, OnDestroy {

  loginForm: FormGroup;
  router = inject(Router);
  authService = inject(AuthService);

  hide = signal(true);
  loading = signal(false);
  showError = signal(false);
  errorMessage = '';
  subscriptionLogin!: Subscription;


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
     if (this.subscriptionLogin) {
      this.subscriptionLogin.unsubscribe();
    }
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.showError.set(true);
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const { username, password } = this.loginForm.value;
    this.loading.set(true);
    this.subscriptionLogin = this.authService.login(username, password).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success) {
          console.log('Login successful:', response);
          localStorage.setItem('bbtrack', JSON.stringify(response.data));

          if (response.data.role === 'ADMIN') {          
            this.router.navigate(['/pedidos']);
          }

          if (response.data.role === 'DRIVE') {            
            this.router.navigate(['/conductor']);
          }

        } else {
          this.showError.set(true);
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.showError.set(true);
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
      }

    })



  }
}


// 913315559