const PROJECTS = [
    {
        id: 'researchos',
        title: 'ResearchOS',
        category: 'GENERATIVE AI · MULTI-AGENT',
        pill: 'Generative AI',
        pillIcon: 'fa-sitemap',
        description: 'ResearchOS is a multi-agent AI research assistant that helps users research complex topics and generate structured reports. Different AI agents work together to collect information, explain concepts, simplify complex ideas, evaluate the research, and prepare the final report.',
        agentFlow: 'Researcher → Teacher → Simplifier → Student → Examiner → Reporter → Final Report',
        tech: ['Python', 'FastAPI', 'React', 'CrewAI', 'OpenRouter', 'Serper', 'Docker', 'JWT'],
        image: 'assets/projects/researchos.png',
        liveDemo: 'https://multi-agent-research-assistant-xjo8.onrender.com/',
        github: 'https://github.com/Ram2002-ai/multi-agent-research-assistant',
        featured: true
    },
    {
        id: 'docmind',
        title: 'DocMind AI',
        category: 'AI · DOCUMENT INTELLIGENCE',
        pill: 'Document AI',
        pillIcon: 'fa-file-alt',
        description: 'DocMind AI is an intelligent document analysis application that allows users to upload documents, extract useful information, and ask questions about their content. It combines document processing, OCR, AI analysis, and a web interface to make working with documents easier.',
        tech: ['Python', 'FastAPI', 'React', 'SQLAlchemy', 'JWT', 'OCR', 'OpenCV', 'PyMuPDF', 'ChromaDB', 'LLM'],
        image: 'assets/projects/docmind-ai.png',
        liveDemo: 'https://docmind-ai-1-hd4f.onrender.com/',
        github: 'https://github.com/Ram2002-ai/DocMind-AI',
        featured: false
    },
    {
        id: 'reality',
        title: 'Reality Intelligence',
        category: 'AI · RECOMMENDATION SYSTEM',
        pill: 'AI Recommendation',
        pillIcon: 'fa-building',
        description: 'Reality Intelligence is an AI-powered real estate recommendation system that helps users find properties based on their preferences such as location, budget, property type, and other requirements. It analyzes property information and presents relevant recommendations through an easy-to-use interface.',
        tech: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Recommendation System', 'Streamlit'],
        image: 'assets/projects/reality-intelligence.png',
        liveDemo: 'https://reality-intelligence.onrender.com/Recommendation',
        github: 'https://github.com/Ram2002-ai',
        featured: false
    },
    {
        id: 'visionx',
        title: 'VisionX AI',
        category: 'COMPUTER VISION · OBJECT DETECTION',
        pill: 'Computer Vision',
        pillIcon: 'fa-crosshairs',
        description: 'VisionX AI is a computer vision application that uses YOLO-based object detection to identify objects from images or video. It processes visual input and displays detected objects with bounding boxes and confidence scores.',
        tech: ['Python', 'YOLOv8', 'OpenCV', 'Computer Vision', 'Object Detection', 'Ultralytics'],
        image: 'assets/projects/object-detection.png',
        liveDemo: 'https://visionx-ai-yszv.onrender.com/',
        github: 'https://github.com/Ram2002-ai/Ultralytics-Yolo-detections-Models',
        featured: false
    },
    {
        id: 'analytics',
        title: 'Data Analytics Dashboard',
        category: 'DATA ANALYTICS · VISUALIZATION',
        pill: 'Data Analytics',
        pillIcon: 'fa-chart-bar',
        description: 'An interactive data analytics dashboard that helps users explore datasets, understand patterns, create visualizations, and discover useful insights. The application turns raw data into easy-to-understand charts and analytical information.',
        tech: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Data Visualization', 'Streamlit'],
        image: 'assets/projects/data-analysis.png',
        liveDemo: 'https://data-analytics-app-zksa.onrender.com/',
        github: 'https://github.com/Ram2002-ai',
        featured: false
    }
];

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map((project, index) => {
        const techBadges = renderTechBadges(project.tech);

        const liveDemoBtn = project.liveDemo
            ? `<a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer"
                  class="project-btn project-btn-demo"
                  aria-label="Open live demo for ${project.title}">
                   <i class="fas fa-external-link-alt"></i> Live Demo
               </a>`
            : '';

        const githubBtn = project.github
            ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer"
                  class="project-btn project-btn-github"
                  aria-label="View GitHub repository for ${project.title}">
                   <i class="fab fa-github"></i> GitHub
               </a>`
            : '';

        const agentFlowHtml = project.agentFlow
            ? `<div class="agent-flow">
                   <span class="agent-flow-label"><i class="fas fa-route"></i> Agent Flow</span>
                   <div class="agent-flow-steps">${
                       project.agentFlow.split(' → ').map(step =>
                           `<span class="agent-step">${step}</span>`
                       ).join('<span class="agent-arrow">→</span>')
                   }</div>
               </div>`
            : '';

        // Last project (5th) gets full-width centered layout
        const isLastSolo = index === 4;

        return `
            <article class="project-card${isLastSolo ? ' project-card--solo' : ''}"
                     style="animation-delay: ${index * 0.1}s">
                <div class="project-image">
                    <img src="${project.image}"
                         alt="${project.title} screenshot"
                         loading="lazy"
                         onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('img-error')">
                    <div class="project-img-overlay"></div>
                    <span class="project-category-pill">
                        <i class="fas ${project.pillIcon}"></i> ${project.pill}
                    </span>
                </div>
                <div class="project-content">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    ${agentFlowHtml}
                    <div class="project-tech">${techBadges}</div>
                    <div class="project-links">${liveDemoBtn}${githubBtn}</div>
                </div>
            </article>
        `;
    }).join('');

    // Animate cards in on scroll — use .in class (matches new CSS)
    const cards = grid.querySelectorAll('.project-card');
    cards.forEach(el => {
        if (window.projectCardObserver) {
            window.projectCardObserver.observe(el);
        } else {
            // Fallback: show immediately
            el.classList.add('in');
        }
    });
}

window.renderProjects = renderProjects;
