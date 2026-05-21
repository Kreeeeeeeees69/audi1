document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sistem de Navigare Multipagină Nativă (SPA Engine) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Îndepărtare stare activă din navigație
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Identificare secțiune țintă
            const targetId = link.getAttribute('href').substring(1);
            
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.style.display = 'block';
                    // Asigurare scroll lin către element
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                } else {
                    // Ascundere secțiuni inactive pentru optimizare procesare vizuală
                    if (window.innerWidth < 769) {
                        section.style.display = 'none';
                    }
                }
            });

            // Închidere automată meniu mobil la click pe un element de navigație
            const audiNav = document.getElementById('audiNav');
            if (audiNav && audiNav.classList.contains('open')) {
                audiNav.classList.remove('open');
            }
        });
    });

    // --- 2. Control Meniu Mobil (Responsive Toggle) ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.audi-nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Transformare vizuală buton burger în corelație cu starea meniului
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // --- 3. Colectare și Procesare Formular Evaluare Peer-to-Peer ---
    const evaluationForm = document.getElementById('evaluationForm');
    const resultsContainer = document.getElementById('resultsContainer');

    if (evaluationForm && resultsContainer) {
        evaluationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extragere valori din câmpurile formularului
            const evaluator = document.getElementById('studentName').value.trim();
            const author = document.getElementById('projectAuthor').value.trim();
            const modelKey = document.getElementById('modelSelect').value;
            const designScore = parseInt(document.getElementById('designScore').value, 10);
            const techScore = parseInt(document.getElementById('techScore').value, 10);
            const feedbackText = document.getElementById('feedbackText').value.trim();

            // Mapare text pentru valoarea selectată din dropdown
            const modelNames = {
                'rs7': 'Audi RS7 (Model Etalon)',
                'rs6': 'Audi RS6 Avant',
                'rs5': 'Audi RS5 Coupé',
                'rs3': 'Audi RS3 Sedan',
                'other': 'Alt Model Audi'
            };

            // Eliminare mesaj de notificare gol la prima inserție validă
            const emptyNotice = resultsContainer.querySelector('.empty-notice');
            if (emptyNotice) {
                emptyNotice.remove();
            }

            // Construire structură DOM pentru randarea rezultatului transmis
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            // Generare timestamp local securizat
            const currentTimestamp = new Date().toLocaleTimeString('ro-RO', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            resultItem.innerHTML = `
                <div class="result-header">
                    <span>Evaluator: ${escapeHTML(evaluator)}</span>
                    <span>Ora: ${currentTimestamp}</span>
                </div>
                <h4>Proiect Audi: ${escapeHTML(author)}</h4>
                <div class="result-scores">
                    <span class="score-tag">Model: ${modelNames[modelKey]}</span>
                    <span class="score-tag">Design: ${designScore}/10</span>
                    <span class="score-tag">Tehnic: ${techScore}/10</span>
                </div>
                <p class="result-comment">${escapeHTML(feedbackText)}</p>
            `;

            // Inserare element nou în vârful stivei de afișare (ordine cronologică inversă)
            resultsContainer.insertBefore(resultItem, resultsContainer.firstChild);

            // Resetare integrală a elementelor de input din formular
            evaluationForm.reset();
        });
    }

    // Funcție utilitară pentru prevenirea atacurilor de tip Cross-Site Scripting (XSS)
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});