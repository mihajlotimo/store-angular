import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors';

@Component({
  selector: 'app-login',
  imports: [Button, RouterLink, ReactiveFormsModule, FormErrors],
  template: `<div class="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
    <h1 class="text-2xl font-bold text-slate-800 mb-6 text-center">Sign In</h1>

    <form class="flex flex-col gap-4" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-500 uppercase tracking-wide">Username</label>
        <input
          id="username"
          type="text"
          formControlName="username"
          placeholder="Enter your username"
          class="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <app-form-errors [control]="loginForm.get('username')!" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-slate-500 uppercase tracking-wide">Password</label>
        <input
          id="password"
          type="password"
          formControlName="password"
          placeholder="••••••••"
          class="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <app-form-errors [control]="loginForm.get('password')!" />
      </div>

      <button size="lg" type="submit" appButton class="w-full">Sign In</button>

      <p class="text-center text-xs text-slate-400">
        Don't have an account?
        <a routerLink="/register" class="text-blue-500 font-medium hover:underline">Register</a>
      </p>
    </form>
  </div>`,
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Login {
  private fb = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
