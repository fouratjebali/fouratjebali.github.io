import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../components/header/header';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('portfolio-website');
  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnimations();
    }
  }

  private initializeAnimations() {
    // Dynamically import AOS only on browser for SSR compatibility
    import('aos').then(({ default: AOS }) => {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: false,
        mirror: true,
        offset: 100,
        disable: false
      });
      AOS.refresh();
    });
  }
}
