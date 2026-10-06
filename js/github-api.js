// GitHub API Integration
const GITHUB_USERNAME = 'Ram2002-ai';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Repository categories based on keywords
const repoCategories = {
    python: ['python', 'script', 'automation', 'flask', 'django', 'api', 'backend'],
    datascience: ['data', 'analysis', 'pandas', 'visualization', 'eda', 'numpy', 'analytics', 'insights'],
    machinelearning: ['ml', 'machine-learning', 'model', 'scikit', 'tensorflow', 'pytorch', 'neural', 'deep-learning', 'ai']
};

// Fetch all repositories from GitHub
async function fetchGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching repos:', error);
        return [];
    }
}

// Categorize repository based on name and description
function categorizeRepo(repoName, repoDesc) {
    const nameLower = repoName.toLowerCase();
    const descLower = (repoDesc || '').toLowerCase();
    
    for (const [category, keywords] of Object.entries(repoCategories)) {
        for (const keyword of keywords) {
            if (nameLower.includes(keyword) || descLower.includes(keyword)) {
                return category;
            }
        }
    }
    return 'datascience';
}

// Render daily work section
function renderDailyWork(repos, category = 'python') {
    const workGrid = document.getElementById('workGrid');
    if (!workGrid) return;
    
    const filteredRepos = repos.filter(repo => categorizeRepo(repo.name, repo.description) === category);
    
    if (filteredRepos.length === 0) {
        workGrid.innerHTML = `
            <div class="card" style="text-align: center; grid-column: 1/-1;">
                <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--text-secondary);"></i>
                <p>No repositories in this category yet. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    workGrid.innerHTML = filteredRepos.slice(0, 8).map(repo => `
        <div class="work-card" onclick="window.open('${repo.html_url}', '_blank')">
            <div class="project-icon" style="width: 45px; height: 45px; font-size: 1.2rem;">
                <i class="fab fa-github"></i>
            </div>
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="tech-stack">
                <span>${repo.language || 'Various'}</span>
                ${repo.stargazers_count > 0 ? `<span>⭐ ${repo.stargazers_count}</span>` : ''}
                ${repo.forks_count > 0 ? `<span>🍴 ${repo.forks_count}</span>` : ''}
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank">View Repository →</a>
            </div>
        </div>
    `).join('');
}

// Render all repositories
function renderAllRepos(repos) {
    const reposGrid = document.getElementById('reposGrid');
    const repoCountElement = document.getElementById('repoCount');
    
    if (reposGrid) {
        if (repos.length === 0) {
            reposGrid.innerHTML = '<div class="loading">No repositories found</div>';
        } else {
            reposGrid.innerHTML = repos.map(repo => `
                <div class="repo-card" onclick="window.open('${repo.html_url}', '_blank')">
                    <h3><i class="fab fa-github"></i> ${repo.name.replace(/-/g, ' ')}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="repo-stats">
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        <span><i class="fas fa-circle"></i> ${repo.language || 'N/A'}</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    if (repoCountElement) {
        repoCountElement.textContent = repos.length;
    }
}

// Render quick projects
function renderQuickProjects(repos) {
    const quickProjectsGrid = document.getElementById('quickProjects');
    if (!quickProjectsGrid) return;
    
    const featuredRepos = repos.slice(0, 4);
    
    if (featuredRepos.length === 0) {
        quickProjectsGrid.innerHTML = '<div class="loading">No projects available</div>';
        return;
    }
    
    quickProjectsGrid.innerHTML = featuredRepos.map(repo => `
        <div class="work-card" onclick="window.open('${repo.html_url}', '_blank')">
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <p>${repo.description ? repo.description.substring(0, 80) : 'No description available'}</p>
            <div class="tech-stack">
                <span>${repo.language || 'Various'}</span>
            </div>
        </div>
    `).join('');
}

// Render activity list
function renderActivityList(repos) {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const recentRepos = repos.slice(0, 5);
    
    if (recentRepos.length === 0) {
        activityList.innerHTML = '<div class="loading">No recent activity</div>';
        return;
    }
    
    activityList.innerHTML = recentRepos.map(repo => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fab fa-github"></i>
            </div>
            <div class="activity-content">
                <p><strong>${repo.name}</strong> - ${repo.description ? repo.description.substring(0, 50) : 'New repository'}</p>
                <div class="activity-time">
                    <i class="far fa-clock"></i> Updated ${new Date(repo.updated_at).toLocaleDateString()}
                </div>
            </div>
        </div>
    `).join('');
}

// Update project links with actual GitHub repos
function updateProjectLinks(repos) {
    const realEstateRepo = repos.find(r => 
        r.name.toLowerCase().includes('real') || 
        r.name.toLowerCase().includes('estate') ||
        r.name.toLowerCase().includes('property') ||
        r.name.toLowerCase().includes('house')
    );
    
    const aiAnalysisRepo = repos.find(r => 
        r.name.toLowerCase().includes('ai') || 
        r.name.toLowerCase().includes('analysis') ||
        r.name.toLowerCase().includes('data') ||
        r.name.toLowerCase().includes('insight')
    );
    
    const projectLinks = document.querySelectorAll('.github-link');
    
    projectLinks.forEach(link => {
        const repoName = link.dataset.repo;
        if (repoName === 'real-estate' && realEstateRepo) {
            link.href = realEstateRepo.html_url;
        } else if (repoName === 'ai-analysis' && aiAnalysisRepo) {
            link.href = aiAnalysisRepo.html_url;
        } else if (link.href === '#') {
            link.href = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
        }
    });
}

// Render more projects
function renderMoreProjects(repos) {
    const moreProjectsGrid = document.getElementById('moreProjectsGrid');
    if (!moreProjectsGrid) return;
    
    const otherRepos = repos.slice(2, 8);
    
    if (otherRepos.length === 0) {
        moreProjectsGrid.innerHTML = '<div class="loading">No more projects</div>';
        return;
    }
    
    moreProjectsGrid.innerHTML = otherRepos.map(repo => `
        <div class="work-card" onclick="window.open('${repo.html_url}', '_blank')">
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <p>${repo.description ? repo.description.substring(0, 100) : 'No description available'}</p>
            <div class="tech-stack">
                <span>${repo.language || 'Various'}</span>
            </div>
        </div>
    `).join('');
}

// Initialize GitHub integration
async function initGitHubIntegration() {
    const repos = await fetchGitHubRepos();
    
    if (repos.length > 0) {
        renderDailyWork(repos, 'python');
        renderAllRepos(repos);
        renderQuickProjects(repos);
        renderActivityList(repos);
        renderMoreProjects(repos);
        updateProjectLinks(repos);
        
        // Setup category tabs
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderDailyWork(repos, btn.dataset.category);
            });
        });
    } else {
        // Fallback content
        const fallbackHTML = `
            <div class="card" style="text-align: center; grid-column: 1/-1;">
                <i class="fab fa-github" style="font-size: 3rem; color: var(--text-secondary);"></i>
                <p>Unable to load repositories. Visit my GitHub profile directly!</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn-github" style="margin-top: 1rem;">
                    <i class="fab fa-github"></i> View GitHub Profile
                </a>
            </div>
        `;
        
        const workGrid = document.getElementById('workGrid');
        const reposGrid = document.getElementById('reposGrid');
        if (workGrid) workGrid.innerHTML = fallbackHTML;
        if (reposGrid) reposGrid.innerHTML = fallbackHTML;
    }
}

// Export for use
window.initGitHubIntegration = initGitHubIntegration;