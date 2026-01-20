const projects = [
    {
        uid: "0xFD29A",
        category: "Autonomous Driving",
        title: "Simulation & Digital Twins",
        description: "Smart City + L4 Self Driving Cars",
        image: "img/tn-ad.png",
        link: "pdvAD.html",
        stats: [
            { label: "Tech", value: "C++ & Unity", highlight: true },
            { label: "Target", value: "Future Autonomous Systems", highlight: true },
        ]
    },
    {
        uid: "0xNE881",
        category: "XR: VR/AR/MR",
        title: "Medical Training Simulation",
        description: "Interactive 3D visualization for surgical simulation environments.",
        image: "img/tn-medical.png",
        link: "pditXR.html",
        stats: [
            { label: "Tech", value: "C++ & Unity", highlight: true },
            { label: "Target", value: "Medical Schools & Doctors", highlight: true }
        ]
    },
    {
        uid: "0xSP006",
        category: "Games",
        title: "3D RPG",
        description: "College Project",
        image: "img/tn-rpg3d.png",
        link: "pdvFF.html",
        stats: [
            { label: "Tech", value: "Unity", highlight: true },
            { label: "Target", value: "Students", highlight: true }
        ]
    },
    {
        uid: "0xSP08",
        category: "Games",
        title: "2.5D Shooter",
        description: "College Project",
        image: "img/tn-shooter.png",
        link: "pdvNull.html",
        stats: [
            { label: "Tech", value: "Unity", highlight: true },
            { label: "Target", value: "Students", highlight: true }
        ]
    }
];

let currentPage = 1;
let totalPages = 1;
let itemsPerPage = 3;

function updateItemsPerPage() {
    itemsPerPage = window.innerWidth < 768 ? 1 : 3;
    renderProjects(document.querySelector('.filter-btn.border-primary')?.dataset.category || 'all');
}

function renderProjects(filterCategory = 'all') {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const filteredProjects = filterCategory === 'all'
        ? projects
        : projects.filter(p => p.category === filterCategory);

    // Calculate pages
    totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (totalPages < 1) totalPages = 1;

    // Update controls
    const totalPagesEl = document.getElementById('total-pages');
    if (totalPagesEl) totalPagesEl.innerText = String(totalPages).padStart(2, '0');
    updatePaginationState();

    container.innerHTML = filteredProjects.map(project => `
        <div class="min-w-full md:min-w-[calc(33.333%-1.33rem)] snap-start glass-card group relative flex flex-col transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.05]" onclick="window.location.href='${project.link}'" style="cursor: pointer;">
            <div class="relative aspect-video overflow-hidden">
                <div class="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" style='background-image: url("${project.image}");'></div>
                <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
                <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 text-[8px] font-mono text-primary uppercase">
                    UID: ${project.uid}
                </div>
            </div>
            <div class="p-8 space-y-4 flex-1 flex flex-col">
                <div class="space-y-1">
                    <span class="text-primary text-[9px] font-bold tracking-[0.3em] uppercase">${project.category}</span>
                    <h3 class="text-2xl font-black text-white uppercase tracking-tight">${project.title}</h3>
                </div>
                <p class="text-sm text-white/40 leading-relaxed font-light flex-1">${project.description}</p>
                <div class="pt-6 border-t border-white/10 mt-4 h-0 opacity-0 group-hover:h-24 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <div class="grid grid-cols-2 gap-4">
                        ${project.stats.map(stat => `
                            <div class="space-y-1">
                                <span class="text-[8px] text-white/30 uppercase font-black">${stat.label}</span>
                                <p class="text-[10px] font-mono ${stat.highlight ? 'text-primary' : ''}">${stat.value}</p>
                            </div>
                        `).join('')}
                        <!--
                        <div class="flex items-center gap-1 text-[9px] font-black uppercase text-white hover:text-primary cursor-pointer transition-colors">
                            View Log <svg class="w-3 h-3" viewBox="0 -960 960 960" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-244-56-56 372-372H580v-80h260v260h-80v-124L388-364Z"/></svg>
                        </div>
                        -->
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Update gallery count
    const galleryCount = document.getElementById('gallery-count');
    if (galleryCount) {
        galleryCount.innerText = `Gallery_Object_Array [length: ${filteredProjects.length}]`;
    }
}

function updatePaginationState() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    // Calculate current page based on scroll position (0-indexed then +1)
    // We add a small buffer (10px) to handle precision issues
    const newPage = Math.round(scrollLeft / containerWidth) + 1;

    if (newPage !== currentPage) {
        currentPage = newPage;
        const currentPageEl = document.getElementById('current-page');
        if (currentPageEl) currentPageEl.innerText = String(currentPage).padStart(2, '0');
    }

    // Update button states
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
}

function setupControls() {
    const container = document.getElementById('projects-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (container) {
        container.addEventListener('scroll', () => {
            // Use requestAnimationFrame for performance
            window.requestAnimationFrame(updatePaginationState);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (container) {
                container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (container) {
                container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
            }
        });
    }

    // Category scrolling
    const catContainer = document.getElementById('category-filters');
    const catPrev = document.getElementById('cat-prev');
    const catNext = document.getElementById('cat-next');

    if (catPrev && catContainer) {
        catPrev.addEventListener('click', () => {
            catContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });
    }

    if (catNext && catContainer) {
        catNext.addEventListener('click', () => {
            catContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(b => {
                b.classList.remove('border-primary', 'bg-primary/10', 'text-primary');
                b.classList.add('border-white/10', 'text-white/40');
            });

            // Add active class to clicked button
            btn.classList.remove('border-white/10', 'text-white/40');
            btn.classList.add('border-primary', 'bg-primary/10', 'text-primary');

            const category = btn.getAttribute('data-category');
            renderProjects(category);

            // Reset scroll to start when filtering
            const container = document.getElementById('projects-container');
            if (container) container.scrollLeft = 0;
        });
    });
}

window.addEventListener('resize', () => {
    updateItemsPerPage();
});

document.addEventListener('DOMContentLoaded', () => {
    updateItemsPerPage(); // Initial render
    setupFilters();
    setupControls();
});

// Loading Screen Removal
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Add a slight delay for a smoother transition
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 800);
        }, 1000);
    }
});
