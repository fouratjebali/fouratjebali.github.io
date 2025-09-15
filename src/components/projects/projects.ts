import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchGitHubProjects();
  }

  fetchGitHubProjects(): void {
    this.isLoading = true;
    this.error = null;
    
    this.http.get<any[]>(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&direction=desc`)
      .subscribe({
        next: (repos) => {
          this.projects = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 9);
            
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load projects from GitHub';
          this.isLoading = false;
          console.error('Error fetching GitHub projects:', err);
        }
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }
}
