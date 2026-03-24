import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  template: `
    @if (control().touched) {
      @if (control().hasError('required')) {
        <span class="text-xs text-red-500">This field is required</span>
      } @else if (control().hasError('minlength')) {
        <span class="text-xs text-red-500">
          At least {{ control().getError('minlength').requiredLength }} characters required
        </span>
      } @else if (control().hasError('email')) {
        <span class="text-xs text-red-500">Invalid email format</span>
      } @else if (control().hasError('passwordMismatch')) {
        <span class="text-xs text-red-500">Passwords do not match</span>
      }
    }
  `,
})
export class FormErrors {
  readonly control = input.required<AbstractControl>();
}
