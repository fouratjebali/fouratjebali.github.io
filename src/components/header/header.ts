import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  profileImages: string[] = [
    'gallery2.png',
    'gallery.png'
  ];
  currentImageIndex: number = 0;
  isMobileMenuOpen = false;
  private readonly headerOffsetPx = 72;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  protected readonly themeService = inject(ThemeService);

  constructor(private router: Router) {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
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
  get currentImage(): string {
    return this.profileImages[this.currentImageIndex];
  }

  onProfileClick(): void {
    this.createRippleOnProfile();
    this.toggleTheme();
    this.currentImageIndex = (this.currentImageIndex + 1) % this.profileImages.length;
  }
}
