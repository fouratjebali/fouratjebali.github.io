import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isMobileMenuOpen = false;
  private readonly headerOffsetPx = 72;

  constructor(private router: Router) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu-btn') && !target.closest('.mobile-menu')) {
      this.isMobileMenuOpen = false;
    }
  }

  // Close mobile menu on escape key
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
      this.router.navigateByUrl('/').then(() => tryScroll(20)); // wait up to ~1s for DOM
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
}
