import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class Projects implements OnInit {
  projects: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  githubUsername: string = 'fouratjebali';
  private readonly CACHE_KEY = 'github_projects_cache';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchGitHubProjects();
  }

  fetchGitHubProjects(): void {
    this.isLoading = true;
    this.error = null;
    
    // Check cache first
    const cached = this.getCachedProjects();
    if (cached) {
      this.projects = cached;
      this.isLoading = false;
      return;
    }

    // Fetch from GitHub API with retry and better error handling
    const apiUrl = `https://api.github.com/users/${this.githubUsername}/repos?sort=updated&direction=desc&per_page=30`;
    
    this.http.get<any[]>(apiUrl)
      .pipe(
        retry(1),
        catchError((error) => {
          this.handleError(error);
          return of([]);
        })
      )
      .subscribe({
        next: (repos) => {
          if (repos && repos.length > 0) {
            this.projects = this.processProjects(repos);
            this.cacheProjects(this.projects);
          } else {
            this.error = 'No projects found';
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.handleError(err);
          this.isLoading = false;
        }
      });
  }

  private processProjects(repos: any[]): any[] {
    return repos
      .filter(repo => !repo.fork && repo.description) // Only show repos with descriptions
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12)
      .map(repo => ({
        ...repo,
        displayLanguage: repo.language || 'Other'
      }));
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 403) {
      this.error = 'API rate limit exceeded. Please try again later.';
    } else if (error.status === 404) {
      this.error = 'GitHub user not found';
    } else if (error.status === 0) {
      this.error = 'Network error. Please check your connection.';
    } else {
      this.error = 'Failed to load projects from GitHub. Please try again.';
    }
    console.error('Error fetching GitHub projects:', error);
  }

  private getCachedProjects(): any[] | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < this.CACHE_DURATION) {
          return data;
        } else {
          localStorage.removeItem(this.CACHE_KEY);
        }
      }
    } catch (e) {
      console.error('Error reading cache:', e);
    }
    return null;
  }

  private cacheProjects(projects: any[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({
        data: projects,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('Error caching projects:', e);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return 'yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short',
        day: 'numeric'
      });
    }
  }
}
