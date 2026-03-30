import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { authFeatures } from '../../shared/store/auth-feature';
import { authActions } from '../../shared/store/auth-actions';

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, ReactiveFormsModule, FormErrors],
  template: `<div class="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
    <h1 class="text-2xl font-bold text-slate-800 mb-6 text-center">Register</h1>

    <form class="flex flex-col gap-4" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-500 uppercase tracking-wide">Username</label>
        <input
          type="text"
          formControlName="username"
          placeholder="Enter your username"
          class="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <app-form-errors [control]="registerForm.get('username')!" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</label>
        <input
          type="email"
          formControlName="email"
          placeholder="Enter your email"
          class="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <app-form-errors [control]="registerForm.get('email')!" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-500 uppercase tracking-wide">Password</label>
        <input
          type="password"
          formControlName="password"
          placeholder="••••••••"
          class="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <app-form-errors [control]="registerForm.get('password')!" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-500 uppercase tracking-wide"
          >Confirm Password</label
        >
        <input
          type="password"
          formControlName="confirmPassword"
          placeholder="••••••••"
          class="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <app-form-errors [control]="registerForm" />
      </div>

      <button size="lg" type="submit" appButton class="w-full" [disabled]="isLoading()">
        {{ isLoading() ? 'Registering...' : 'Register' }}
      </button>

      <p class="text-center text-xs text-slate-400">
        Already have an account?
        <a routerLink="/login" class="text-blue-500 font-medium hover:underline">Login</a>
      </p>
    </form>
  </div>`,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Register {
  private fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: (form: AbstractControl) => {
        return form.get('password')?.value === form.get('confirmPassword')?.value
          ? null
          : { passwordMismatch: true };
      },
    },
  );

  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeatures.selectIsLoading));

  onSubmit() {
    if (this.registerForm.valid) {
      const id = Date.now();
      const { confirmPassword, ...rest } = this.registerForm.value;
      const registerRequest = { id, ...rest };
      this.store.dispatch(authActions.register(registerRequest));
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
