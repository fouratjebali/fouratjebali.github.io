import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMobileMenuOpen = false;
  private readonly headerOffsetPx = 72;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(private router: Router) {
    if (this.isBrowser) {
      this.initializeThemeFromStorage();
    }
  }

  private initializeThemeFromStorage(): void {
    try {
      const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('preferred-theme') : null;
      if (stored === 'dark') {
        document.body.classList.add('dark-theme');
      } else if (stored === 'light') {
        document.body.classList.remove('dark-theme');
      }
    } catch {
    }
  }

  private toggleTheme(): void {
    if (!this.isBrowser) return;
    const willEnableDark = !document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme', willEnableDark);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('preferred-theme', willEnableDark ? 'dark' : 'light');
      }
    } catch {
    }
  }

  private createRippleOnProfile(): void {
    if (!this.isBrowser) return;
    const profileImg = document.querySelector('.profile-image') as HTMLElement | null;
    if (!profileImg) return;

    const container = profileImg.parentElement as HTMLElement;
    if (!container) return;

    if (!container.style.position) {
      container.style.position = 'relative';
    }

    const ripple = document.createElement('span');
    ripple.className = 'profile-ripple';

    const rect = profileImg.getBoundingClientRect();
    const maxDim = Math.max(rect.width, rect.height);
    const size = maxDim * 2.2;

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${rect.width / 2}px`;
    ripple.style.top = `${rect.height / 2}px`;

    container.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      if (ripple.parentElement) {
        ripple.parentElement.removeChild(ripple);
      }
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu-btn') && !target.closest('.mobile-menu')) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.isMobileMenuOpen = false;
  }

  scrollTo(sectionId: string): void {
    const tryScroll = (attemptsLeft: number) => {
      const el = document.getElementById(sectionId);
      if (el) {
        const targetY = el.getBoundingClientRect().top + window.scrollY - this.headerOffsetPx;
        this.animateScrollTo(targetY, 700);
        return;
      }
      if (attemptsLeft > 0) {
        setTimeout(() => tryScroll(attemptsLeft - 1), 50);
      }
    };

    if (this.router.url !== '/') {
      this.router.navigateByUrl('/').then(() => tryScroll(20)); 
    } else {
      tryScroll(1);
    }
  }

  private animateScrollTo(targetY: number, durationMs: number): void {
    const startY = window.scrollY;
    const deltaY = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const y = startY + deltaY * easeInOutCubic(t);
      window.scrollTo(0, y);
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  onProfileClick(): void {
    this.createRippleOnProfile();
    this.toggleTheme();
  }
}
