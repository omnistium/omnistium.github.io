document.addEventListener('DOMContentLoaded', () => {
    // 1. ПІДСТВІТКА АКТИВНОЇ СТОРІНКИ В ХЕДЕРІ
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. АВТОМАТИЧНИЙ РІК У ФУТЕРІ
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // 3. МOБІЛЬНЕ МЕНЮ (БУРГЕР)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            if (navMenu.classList.contains('open')) {
                mobileMenuBtn.innerText = '✕';
                mobileMenuBtn.style.transform = 'rotate(90deg)';
            } else {
                mobileMenuBtn.innerText = '☰';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });
    }

    // 4. ПЕРЕМИКАННЯ ПРАВИЛ
    const sidebarLinks = document.querySelectorAll('.sidebar-id');
    const ruleSections = document.querySelectorAll('.rules-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('data-target');

            ruleSections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('id') === targetId) {
                    section.classList.add('active');
                }
            });
            
            if (window.innerWidth <= 768) {
                document.querySelector('.rules-content').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. ДИНАМІЧНИЙ ЕФЕКТ СВІТЛОВОГО ВІДБЛИСКУ НА КАРТКАХ
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.04), transparent 40%), var(--bg-card)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-card)';
        });
    });

    // 6. СУПЕР-ПАСХАЛКА: 15 КЛІКІВ ПО ЛОГОТИПУ
    const logoBlock = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimeout;
    let gearInterval;

    if (logoBlock) {
        logoBlock.addEventListener('click', (e) => {
            e.preventDefault(); 
            clickCount++;
            
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                clickCount = 0;
            }, 2000); 

            if (clickCount === 15) {
                clickCount = 0;
                triggerSystemOverload();
            }
        });
    }

    function triggerSystemOverload() {
        document.documentElement.classList.add('system-overload');

        const flash = document.createElement('div');
        Object.assign(flash.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            backgroundColor: 'var(--purple-accent)', zIndex: '9999', opacity: '0.6',
            transition: 'opacity 0.4s ease', pointerEvents: 'none'
        });
        document.body.appendChild(flash);
        setTimeout(() => flash.style.opacity = '0', 50);
        setTimeout(() => flash.remove(), 500);

        gearInterval = setInterval(() => {
            const container = document.createElement('div');
            container.className = 'gear-container';
            
            const gearImg = document.createElement('img');
            gearImg.src = 'gear.png';
            gearImg.className = 'falling-gear';
            
            const size = Math.random() * 12 + 12;
            container.style.width = size + 'px';
            container.style.height = size + 'px';
            
            container.style.left = Math.random() * 100 + 'vw';
            container.style.animationDuration = Math.random() * 2 + 1.5 + 's';
            
            gearImg.style.animationDuration = Math.random() * 1 + 0.5 + 's';
            if (Math.random() > 0.5) {
                gearImg.style.animationDirection = 'reverse';
            }

            const blurVal = Math.random() > 0.6 ? Math.random() * 2 : 0;
            if (blurVal > 0) {
                container.style.filter = `blur(${blurVal}px)`;
            }
            
            container.appendChild(gearImg);
            document.body.appendChild(container);

            setTimeout(() => {
                container.remove();
            }, 3500);
        }, 100);

        setTimeout(() => {
            clearInterval(gearInterval);
            document.documentElement.classList.remove('system-overload');
        }, 8000);
    }

    // 8. ДИНАМІЧНИЙ РІДКИЙ ПОВЗУНОК НАВІГАЦІЇ
    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer && window.innerWidth > 768) {
        // Створюємо елемент індикатора
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        navLinksContainer.appendChild(indicator);

        const activeLink = navLinksContainer.querySelector('a.active');

        // Функція оновлення позиції повзунка під посиланням
        function moveIndicator(target) {
            if (!target) return;
            indicator.style.left = target.offsetLeft + 'px';
            indicator.style.width = target.offsetWidth + 'px';
        }

        // Початкова позиція на активній сторінці
        if (activeLink) {
            moveIndicator(activeLink);
        }

        // Ефект ковзання при наведенні миші на інші пункти
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                moveIndicator(e.target);
            });
        });

        // Повернення повзунка на активну сторінку, коли мишка йде з хедера
        navLinksContainer.addEventListener('mouseleave', () => {
            const currentActive = navLinksContainer.querySelector('a.active');
            if (currentActive) {
                moveIndicator(currentActive);
            }
        });
    }
});

// 7. ГОЛОВНА ФУНКЦІЯ ТОСТІВ
function showToast(message) {
    const existingToast = document.getElementById('copy-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.innerText = message;
    
    Object.assign(toast.style, {
        position: 'fixed', bottom: '24px', right: '24px',
        backgroundColor: 'var(--bg-card)', color: 'var(--text-main)',
        border: '1px solid var(--purple-accent)',
        boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)',
        padding: '1rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem',
        fontWeight: '500', zIndex: '1000', opacity: '0',
        transform: 'translateY(20px)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function copyIP() {
    const ipText = document.getElementById('server-ip').innerText;
    navigator.clipboard.writeText(ipText).then(() => {
        showToast('IP адресу успешно скопійовано!');
    }).catch(err => {
        console.error('Не вдалося скопіювати: ', err);
    });
}