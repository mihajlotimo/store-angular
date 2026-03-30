import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Button],
  template: `
    <div class="sticky top-0 z-50 w-full px-4 py-3 bg-slate-900 text-white shadow-lg">
      <nav class="container mx-auto flex items-center justify-between">
        <a routerLink="/" class="text-xl font-bold tracking-tight">NgrxStore</a>

        <div class="flex items-center gap-4">
          <button
            appButton
            variant="ghost"
            type="button"
            class="text-white hover:text-gray300 hover:bg-white/10"
          >
            Logout
          </button>
          <button
            routerLink="/profile"
            appButton
            variant="ghost"
            type="button"
            class="text-white hover:bg-white/10"
          >
            Profile
          </button>
          <button
            appButton
            variant="ghost"
            type="button"
            class="relative text-white hover:bg-white/10"
            routerLink="/cart"
          >
            Cart
            <span
              class="absolute
              -top-1
              -right-1
              size-5
              flex
              items-center
              justify-center
              bg-amber-500
              text-xs
              font-medium
              rounded-full"
              >10</span
            >
          </button>
        </div>
      </nav>
    </div>
  `,
})
export class Header {}
