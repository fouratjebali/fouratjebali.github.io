import { Component, HostListener } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

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
  isProfileSpinning = false;

  constructor(private router: Router) {}

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
    if (this.isProfileSpinning) return;
    
    this.isProfileSpinning = true;
    
    this.createParticleEffect();
    
    setTimeout(() => {
      this.isProfileSpinning = false;
    }, 1200);
  }

  private createParticleEffect(): void {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      
      const profileImg = document.querySelector('.profile-image') as HTMLElement;
      const rect = profileImg.getBoundingClientRect();
      particle.style.left = (rect.left + rect.width / 2) + 'px';
      particle.style.top = (rect.top + rect.height / 2) + 'px';
      
      document.body.appendChild(particle);
      
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 100 + Math.random() * 50;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => {
        document.body.removeChild(particle);
      };
    }
  }
}
