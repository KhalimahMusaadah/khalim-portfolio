//scroll sections with navbar background
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');

function updateNavbarBackground() {
    let scrollY = window.scrollY;
    let currentSection = '';
    
    sections.forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(scrollY >= offset && scrollY < offset + height){
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            let activeLink = document.querySelector(`header nav a[href*="#${id}"]`);
            if(activeLink) {
                activeLink.classList.add('active');
            }
            
            currentSection = id;
        }
    });

    // Update navbar background based on current section
    header.className = 'header'; // Reset classes
    if (currentSection) {
        header.classList.add(`${currentSection}-bg`);
    }

    //sticky header behavior
    header.classList.toggle('sticky', scrollY > 100);
}

window.onscroll = updateNavbarBackground;

// Also update on page load
window.addEventListener('load', updateNavbarBackground);

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let navbarOverlay = document.querySelector('.navbar-overlay');
if (!navbarOverlay) {
    navbarOverlay = document.createElement('div');
    navbarOverlay.className = 'navbar-overlay';
    document.body.appendChild(navbarOverlay);
}

function openNavbar() {
    menuIcon.classList.add('bx-x');
    navbar.classList.add('active');
    navbarOverlay.classList.add('active');
    document.body.classList.add('navbar-open');
}

function closeNavbar() {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    navbarOverlay.classList.remove('active');
    document.body.classList.remove('navbar-open');
}

if(menuIcon) {
    menuIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navbar.classList.contains('active')) {
            closeNavbar();
        } else {
            openNavbar();
        }
    });
}

navbarOverlay.addEventListener('click', closeNavbar);

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            closeNavbar();
        }

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            e.preventDefault();

            const headerHeight = document.querySelector('.header').offsetHeight;
            const sectionTop = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });

            // Update navbar background immediately after click
            setTimeout(() => {
                updateNavbarBackground();
            }, 100);

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

window.addEventListener('scroll', () => {
    if (navbar.classList.contains('active')) {
        closeNavbar();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbar.classList.contains('active')) {
        closeNavbar();
    }
});

//education-click
document.addEventListener('DOMContentLoaded', function () {
    const contentBoxes = document.querySelectorAll('.education-content .content');

    contentBoxes.forEach(box => {
        box.addEventListener('click', () => {
            contentBoxes.forEach(b => {
                if (b !== box) b.classList.remove('active');
            });

            box.classList.toggle('active');
        });
    });
});

//see-more-button
const seeMoreBtn = document.getElementById('see-more-btn');
const extraProjects = document.querySelector('.extra-projects');
let isVisible = false;

if (seeMoreBtn && extraProjects) {
    seeMoreBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        extraProjects.classList.toggle('hidden', !isVisible);
        seeMoreBtn.textContent = isVisible ? 'See Less' : 'See More';
    });
}

//certificates-carousel
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".certificates-wrapper");
    const boxes = document.querySelectorAll(".certificate-box");
    const prevBtn = document.querySelector(".carousel-btn-prev");
    const nextBtn = document.querySelector(".carousel-btn-next");
    const dotsContainer = document.querySelector(".carousel-dots");

    if (!wrapper || !boxes.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.error("Elemen carousel tidak ditemukan!");
        return;
    }

    let currentIndex = 0;
    let boxesPerView = 3;

    function updateBoxesPerView() {
        if (window.innerWidth <= 768) {
            boxesPerView = 1;
        } else if (window.innerWidth <= 1200) {
            boxesPerView = 2;
        } else {
            boxesPerView = 3;
        }
    }

    function createDots() {
        dotsContainer.innerHTML = "";
        const totalSteps = boxes.length - boxesPerView + 1;
        for (let i = 0; i < totalSteps; i++) {
            const dot = document.createElement("div");
            dot.classList.add("carousel-dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToIndex(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const boxWidth = boxes[0].offsetWidth + 24;
        wrapper.style.transform = `translateX(-${currentIndex * boxWidth}px)`;

        const dots = document.querySelectorAll(".carousel-dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= boxes.length - boxesPerView;
    }

    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, boxes.length - boxesPerView));
        updateCarousel();
    }

    prevBtn.addEventListener("click", () => goToIndex(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToIndex(currentIndex + 1));

    boxes.forEach(box => {
        const overlay = box.querySelector('.certificate-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                const onclickAttr = box.getAttribute('onclick');
                if (onclickAttr) {
                    const urlMatch = onclickAttr.match(/openCertificate\('([^']+)'\)/);
                    if (urlMatch && urlMatch[1]) {
                        openCertificate(urlMatch[1]);
                    }
                }
            });
        }
    });

    window.addEventListener("resize", () => {
        updateBoxesPerView();
        createDots();
        updateCarousel();
    });

    updateBoxesPerView();
    createDots();
    updateCarousel();
});

function openCertificate(url) {
    console.log("Opening certificate:", url);
    window.open(url, "_blank");
}

//contact form submission
const form = document.getElementById("contact-form");
const messageBox = document.getElementById("form-message");

if (form && messageBox) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });
            
            if (response.ok) {
                messageBox.textContent = "✅ Pesan berhasil dikirim!";
                messageBox.className = "success-message";
                messageBox.style.display = "block";
                form.reset();
            } else {
                throw new Error("Terjadi kesalahan saat mengirim pesan.");
            }
        } catch (error) {
            messageBox.textContent = "❌ Gagal mengirim pesan. Silakan coba lagi.";
            messageBox.className = "error-message";
            messageBox.style.display = "block";
        }
        
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 5000);
    });
}

// Initialize navbar background on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarBackground();
});