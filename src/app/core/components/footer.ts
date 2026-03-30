import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="w-full px-4 py-6 bg-slate-800 text-slate-400 mt-auto">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm">&copy; 2026 NgrxStore. All rights reserved.</p>
        <nav>
          <ul class="flex items-center gap-6 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-white transition-colors">Github</a>
          <a href="#" class="hover:text-white transition-colors">X</a>
        </div>
      </div>
    </div>
  `,
})
export class Footer {}
