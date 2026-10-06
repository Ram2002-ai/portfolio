const TECH_BADGE_MAP = {
    'Python': { color: '3776AB', logo: 'python' },
    'SQL': { color: '4169E1' },
    'FastAPI': { color: '009688', logo: 'fastapi' },
    'Streamlit': { color: 'FF4B4B', logo: 'streamlit' },
    'Gradio': { color: 'F97316' },
    'React': { color: '61DAFB', logo: 'react' },
    'LangChain': { color: '1C3C3C' },
    'LangGraph': { color: '2E7D32' },
    'CrewAI': { color: '111827' },
    'RAG': { color: '7C3AED' },
    'Prompt Engineering': { color: '6366F1' },
    'Tool Calling': { color: '4F46E5' },
    'Vector Search': { color: '0EA5E9' },
    'LLM APIs': { color: '2563EB' },
    'Scikit-learn': { color: 'F7931E', logo: 'scikitlearn' },
    'XGBoost': { color: '1F2937' },
    'Classification': { color: '334155' },
    'Regression': { color: '334155' },
    'Feature Engineering': { color: '475569' },
    'Model Evaluation': { color: '475569' },
    'Machine Learning': { color: '111827' },
    'Data Analysis': { color: '0F766E' },
    'Data Visualization': { color: '0891B2' },
    'AI': { color: '7C3AED' },
    'NumPy': { color: '013243', logo: 'numpy' },
    'Pandas': { color: '150458', logo: 'pandas' },
    'EDA': { color: '0E7490' },
    'Plotly': { color: '3D4F71' },
    'Power BI': { color: 'F2C811' },
    'REST APIs': { color: '1D4ED8' },
    'Git': { color: 'F05032', logo: 'git' },
    'Docker': { color: '2496ED', logo: 'docker' },
    'YOLO': { color: '111F68' },
    'Ultralytics': { color: '111F68' },
    'OpenCV': { color: '5C3EE8', logo: 'opencv' },
    'FAISS': { color: '00A67E' },
    'SQLite': { color: '003B57', logo: 'sqlite' },
    'Hugging Face': { color: 'FFD21E', logo: 'huggingface' },
    'PyTorch': { color: 'EE4C2C', logo: 'pytorch' },
    'TensorFlow': { color: 'FF6F00', logo: 'tensorflow' },
    'AWS': { color: '232F3E', logo: 'amazonaws' },
    'PostgreSQL': { color: '4169E1', logo: 'postgresql' },
    'MySQL': { color: '4479A1', logo: 'mysql' },
    'Linux': { color: 'FCC624', logo: 'linux' },
    'JWT': { color: '000000', logo: 'jsonwebtokens' },
    'OCR': { color: '0F766E' },
    'PyMuPDF': { color: '004B87' },
    'ChromaDB': { color: '6B21A8' },
    'LLM': { color: '7C3AED' },
    'OpenRouter': { color: '111827' },
    'Serper': { color: '1D4ED8' },
    'YOLOv8': { color: '111F68' },
    'Recommendation System': { color: '0E7490' },
    'Computer Vision': { color: '5C3EE8' },
    'Object Detection': { color: '111F68' },
    'REST API': { color: '1D4ED8' }
};

function getTechBadgeUrl(tech) {
    const config = TECH_BADGE_MAP[tech] || { color: '334155' };
    const label = encodeURIComponent(tech.replace(/ /g, ' '));
    const logoQuery = config.logo ? `&logo=${config.logo}&logoColor=white` : '';
    return `https://img.shields.io/badge/${label}-${config.color}?style=flat-square${logoQuery}`;
}

function renderTechBadge(tech) {
    const url = getTechBadgeUrl(tech);
    return `<img class="tech-badge" src="${url}" alt="${tech}" title="${tech}" loading="lazy">`;
}

function renderTechBadges(techList) {
    return techList.map(renderTechBadge).join('');
}

function renderSkillBadges() {
    document.querySelectorAll('[data-tech]').forEach(el => {
        const tech = el.getAttribute('data-tech');
        el.innerHTML = renderTechBadge(tech);
        el.classList.add('skill-badge-item');
    });
}

window.renderTechBadge = renderTechBadge;
window.renderTechBadges = renderTechBadges;
window.renderSkillBadges = renderSkillBadges;
