const cities = [{ name: "Bujumbura", country: "Burundi" }, { name: "Gitega", country: "Burundi" }, { name: "Algiers", country: "Algeria" }, { name: "Oran", country: "Algeria" }, { name: "Baku", country: "Azerbaijan" }, { name: "Ganja", country: "Azerbaijan" }, { name: "Lima", country: "Peru" }, { name: "Arequipa", country: "Peru" }, { name: "Cusco", country: "Peru" }, { name: "Manila", country: "Philippines" }, { name: "Quezon City", country: "Philippines" }, { name: "Davao", country: "Philippines" }, { name: "Warsaw", country: "Poland" }, { name: "Kraków", country: "Poland" }, { name: "Wrocław", country: "Poland" }, { name: "Lisbon", country: "Portugal" }, { name: "Porto", country: "Portugal" }, { name: "Amadora", country: "Portugal" }, { name: "Doha", country: "Qatar" }, { name: "Bucharest", country: "Romania" }, { name: "Cluj-Napoca", country: "Romania" }, { name: "Timișoara", country: "Romania" }, { name: "Moscow", country: "Russia" }, { name: "Saint Petersburg", country: "Russia" }, { name: "Novosibirsk", country: "Russia" }, { name: "Kigali", country: "Rwanda" }, { name: "Butare", country: "Rwanda" }, { name: "San Salvador", country: "El Salvador" }, { name: "Dushanbe", country: "Tajikistan" }, { name: "Dar es Salaam", country: "Tanzania" }, { name: "Dodoma", country: "Tanzania" }, { name: "Bangkok", country: "Thailand" }, { name: "Chiang Mai", country: "Thailand" }, { name: "Pattaya", country: "Thailand" }, { name: "Lomé", country: "Togo" }, { name: "Port of Spain", country: "Trinidad and Tobago" }, { name: "Tunis", country: "Tunisia" }, { name: "Sfax", country: "Tunisia" }, { name: "Ankara", country: "Turkey" }, { name: "Istanbul", country: "Turkey" }, { name: "Izmir", country: "Turkey" }, { name: "Ashgabat", country: "Turkmenistan" }, { name: "Funafuti", country: "Tuvalu" }, { name: "Kiev", country: "Ukraine" }, { name: "Lviv", country: "Ukraine" }, { name: "Odessa", country: "Ukraine" }, { name: "Abu Dhabi", country: "United Arab Emirates" }, { name: "Dubai", country: "United Arab Emirates" }, { name: "London", country: "United Kingdom" }, { name: "Manchester", country: "United Kingdom" }, { name: "Birmingham", country: "United Kingdom" }, { name: "Washington, D.C.", country: "United States" }, { name: "New York City", country: "United States" }, { name: "Los Angeles", country: "United States" }, { name: "Montevideo", country: "Uruguay" }, { name: "Salto", country: "Uruguay" }, { name: "Tashkent", country: "Uzbekistan" }, { name: "Samarkand", country: "Uzbekistan" }, { name: "Vancouver", country: "Canada" }, { name: "Toronto", country: "Canada" }, { name: "Ottawa", country: "Canada" }, { name: "Caracas", country: "Venezuela" }, { name: "Maracaibo", country: "Venezuela" }, { name: "Valencia", country: "Venezuela" }, { name: "Hanoi", country: "Vietnam" }, { name: "Ho Chi Minh City", country: "Vietnam" }, { name: "Da Nang", country: "Vietnam" }, { name: "Sana'a", country: "Yemen" }, { name: "Zagreb", country: "Croatia" }, { name: "Addis Ababa", country: "Ethiopia" }, { name: "Yerevan", country: "Armenia" }, { name: "Port-au-Prince", country: "Haiti" }, { name: "Warsaw", country: "Poland" }];

document.querySelector('.arrow-container').addEventListener('click', () => {
    const screenHeight = window.innerHeight;
    const currentScroll = window.scrollY || window.pageYOffset;

    window.scrollTo({
        top: currentScroll + screenHeight,
        behavior: 'smooth',
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const sliderContainer = document.querySelector('.slider-container');
    const slideWidth = slides[0].offsetWidth;
    let currentPosition = 0;
    let startX = 0;
    let isDragging = false;
    let visibleSlides = 2;
    const totalSlides = slides.length;
    let clonedSlides = [];
    let isMobile = false;


    function cloneSlides() {
        for(let i = 0; i < visibleSlides; i++) {
            const firstSlide = slides[i].cloneNode(true);
            const lastSlide = slides[totalSlides - 1 - i].cloneNode(true);
            sliderWrapper.appendChild(firstSlide);
            sliderWrapper.insertBefore(lastSlide, slides[0]);
            clonedSlides.push(firstSlide, lastSlide);
        }
    }


    function updateSlider() {
        let translateXValue = -(currentPosition + visibleSlides) * slideWidth;


        if (isMobile) {
            translateXValue = -(currentPosition + visibleSlides) * slideWidth;
            const centerOffset = (sliderContainer.offsetWidth - slideWidth) / 2;
            translateXValue += centerOffset;
        }

        sliderWrapper.style.transform = `translateX(${translateXValue}px)`;

    }

    function updateVisibleSlides() {
        if (window.innerWidth <= 768) {
            visibleSlides = 1;
            isMobile = true;

        } else if(window.innerWidth <= 1024) {
            visibleSlides = 2;
            isMobile = false;
        }
        else {
            visibleSlides = 3;
            isMobile = false;
        }

        currentPosition = 0;
    }

    updateVisibleSlides()
    cloneSlides()
    updateSlider()


    function checkPosition() {
        if (currentPosition < -totalSlides) {
            currentPosition = 0;
            sliderWrapper.style.transition = 'none';
            updateSlider();

            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease';
            });
        } else if(currentPosition > totalSlides) {
            currentPosition = 0;
            sliderWrapper.style.transition = 'none';
            updateSlider();

            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease';
            });
        }
    }

    function nextSlide() {
        currentPosition++;
        sliderWrapper.style.transition = `transform 0.5s ease`;
        updateSlider();
        sliderWrapper.addEventListener('transitionend', checkPosition);
    }

    function prevSlide() {
        currentPosition--;
        sliderWrapper.style.transition = `transform 0.5s ease`;
        updateSlider();
        sliderWrapper.addEventListener('transitionend', checkPosition);
    }

    sliderContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - sliderWrapper.offsetLeft;
        sliderWrapper.style.transition = `none`;
        sliderContainer.style.cursor = 'grabbing';
    });

    sliderContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - sliderWrapper.offsetLeft;
        sliderWrapper.style.transition = `none`;
        sliderContainer.style.cursor = 'grabbing';
    });

    sliderContainer.addEventListener('mouseup', () => {
        isDragging = false
        sliderContainer.style.cursor = 'grab';

    });
    sliderContainer.addEventListener('touchend', () => {
        isDragging = false
        sliderContainer.style.cursor = 'grab';
    });
    sliderContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        sliderContainer.style.cursor = 'grab';
    });

    sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = e.clientX - sliderWrapper.offsetLeft - startX;
        sliderWrapper.style.transform = `translateX(${-(currentPosition + visibleSlides) * slideWidth + diff}px)`;
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - sliderWrapper.offsetLeft - startX;
        sliderWrapper.style.transform = `translateX(${-(currentPosition + visibleSlides) * slideWidth + diff}px)`;

    });
    window.addEventListener('resize', function () {
        updateVisibleSlides();
        cloneSlides();
        updateSlider();
        if(currentPosition > slides.length) {
            currentPosition = 0
            updateSlider()
        }
    });


    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

});


const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const scrollPercent = (scrollPosition / documentHeight) * 100;

    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

function autocomplete(input, arr) {
    let currentFocus;
    input.addEventListener("input", function () {
        const value = this.value;
        closeAllLists();
        if (!value) return false;
        currentFocus = -1;
        const list = document.createElement("div");
        list.setAttribute("id", this.id + "-autocomplete-list");
        list.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(list);

        const filteredCities = arr.filter(city =>
            city.name.toUpperCase().includes(value.toUpperCase()) ||
            city.country.toUpperCase().includes(value.toUpperCase())
        );

        const limitedCities = filteredCities.slice(0, 5);

        limitedCities.forEach(city => {
            const item = document.createElement("div");
            const matchCity = city.name.toUpperCase().includes(value.toUpperCase());
            const matchCountry = city.country.toUpperCase().includes(value.toUpperCase());
            item.innerHTML = `
                ${matchCity ? `<strong>${city.name}</strong>` : city.name}, 
                ${matchCountry ? `<strong>${city.country}</strong>` : city.country}`;
            item.addEventListener("click", function () {
                input.value = city.name;
                closeAllLists();
            });
            list.appendChild(item);
        });
    });

    input.addEventListener("keydown", function (e) {
        let items = document.getElementById(this.id + "-autocomplete-list");
        if (items) items = items.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (items) items[currentFocus].click();
            }
        }
    });

    function addActive(items) {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(items) {
        for (let item of items) {
            item.classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(el) {
        const items = document.getElementsByClassName("autocomplete-items");
        for (let item of items) {
            if (el !== item && el !== input) {
                item.parentNode.removeChild(item);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("from"), cities);
autocomplete(document.getElementById("to"), cities);

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const overlay = document.querySelector('.header-overlay');

    if (!burger || !nav || !overlay) {
        console.error('Не найдены элементы для бургера, меню или оверлея');
        return;
    }

    burger.addEventListener('click', function () {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');

        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    overlay.addEventListener('click', function () {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginPopup = document.getElementById('loginPopup');
const registerPopup = document.getElementById('registerPopup');
const loginClose = document.getElementById('loginClose');
const registerClose = document.getElementById('registerClose');

loginBtn.addEventListener('click', () => {
    loginPopup.classList.add('show');
    setTimeout(() => {
        loginPopup.querySelector('.popup-content').classList.add('show');
    }, 50);
});

registerBtn.addEventListener('click', () => {
    registerPopup.classList.add('show');
    setTimeout(() => {
        registerPopup.querySelector('.popup-content').classList.add('show');
    }, 50);
});

loginClose.addEventListener('click', () => {
    loginPopup.querySelector('.popup-content').classList.remove('show');
    setTimeout(() => {
        loginPopup.classList.remove('show');
    }, 300);
});

registerClose.addEventListener('click', () => {
    registerPopup.querySelector('.popup-content').classList.remove('show');
    setTimeout(() => {
        registerPopup.classList.remove('show');
    }, 300);
});

loginPopup.querySelector('.overlay').addEventListener('click', () => {
    loginPopup.querySelector('.popup-content').classList.remove('show');
    setTimeout(() => {
        loginPopup.classList.remove('show');
    }, 300);
});

registerPopup.querySelector('.overlay').addEventListener('click', () => {
    registerPopup.querySelector('.popup-content').classList.remove('show');
    setTimeout(() => {
        registerPopup.classList.remove('show');
    }, 300);
});

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginSubmit = document.getElementById('loginSubmit');
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');

loginEmail.addEventListener('input', validateLoginEmail);
loginPassword.addEventListener('input', validateLoginPassword);
loginClose.addEventListener('click', resetLoginForm);

function validateLoginEmail() {
    if (!loginEmail.value || !/\S+@\S+\.\S+/.test(loginEmail.value)) {
        loginEmail.classList.remove('valid');
        loginEmail.classList.add('invalid');
        loginEmailError.textContent = 'Lütfen geçerli bir e-posta adresi girin.';
    } else {
        loginEmail.classList.remove('invalid');
        loginEmail.classList.add('valid');
        loginEmailError.textContent = '';
    }

    toggleLoginSubmit();
}

function validateLoginPassword() {
    if (!loginPassword.value || loginPassword.value.length < 6) {
        loginPassword.classList.remove('valid');
        loginPassword.classList.add('invalid');
        loginPasswordError.textContent = 'Şifre en az 6 karakter olmalıdır.';
    } else {
        loginPassword.classList.remove('invalid');
        loginPassword.classList.add('valid');
        loginPasswordError.textContent = '';
    }

    toggleLoginSubmit();
}

function toggleLoginSubmit() {
    const isValid = loginEmail.classList.contains('valid') && loginPassword.classList.contains('valid');
    loginSubmit.disabled = !isValid;
}

function resetLoginForm() {
    loginEmail.classList.remove('valid', 'invalid');
    loginPassword.classList.remove('valid', 'invalid');
    loginEmailError.textContent = '';
    loginPasswordError.textContent = '';
    loginSubmit.disabled = true;
    loginEmail.value = '';
    loginPassword.value = '';
}

const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerSubmit = document.getElementById('registerSubmit');
const registerNameError = document.getElementById('registerNameError');
const registerEmailError = document.getElementById('registerEmailError');
const registerPasswordError = document.getElementById('registerPasswordError');

registerName.addEventListener('input', validateRegisterName);
registerEmail.addEventListener('input', validateRegisterEmail);
registerPassword.addEventListener('input', validateRegisterPassword);
registerClose.addEventListener('click', resetRegisterForm);

function validateRegisterName() {
    if (!registerName.value) {
        registerName.classList.remove('valid');
        registerName.classList.add('invalid');
        registerNameError.textContent = 'Ad alanı boş olamaz.';
    } else {
        registerName.classList.remove('invalid');
        registerName.classList.add('valid');
        registerNameError.textContent = '';
    }

    toggleRegisterSubmit();
}

function validateRegisterEmail() {
    if (!registerEmail.value || !/\S+@\S+\.\S+/.test(registerEmail.value)) {
        registerEmail.classList.remove('valid');
        registerEmail.classList.add('invalid');
        registerEmailError.textContent = 'Lütfen geçerli bir e-posta adresi girin.';
    } else {
        registerEmail.classList.remove('invalid');
        registerEmail.classList.add('valid');
        registerEmailError.textContent = '';
    }

    toggleRegisterSubmit();
}

function validateRegisterPassword() {
    if (!registerPassword.value || registerPassword.value.length < 6) {
        registerPassword.classList.remove('valid');
        registerPassword.classList.add('invalid');
        registerPasswordError.textContent = 'Şifre en az 6 karakter olmalıdır.';
    } else {
        registerPassword.classList.remove('invalid');
        registerPassword.classList.add('valid');
        registerPasswordError.textContent = '';
    }

    toggleRegisterSubmit();
}

function toggleRegisterSubmit() {
    const isValid = registerName.classList.contains('valid') && registerEmail.classList.contains('valid') && registerPassword.classList.contains('valid');
    registerSubmit.disabled = !isValid;
}

function resetRegisterForm() {
    registerName.classList.remove('valid', 'invalid');
    registerEmail.classList.remove('valid', 'invalid');
    registerPassword.classList.remove('valid', 'invalid');
    registerNameError.textContent = '';
    registerEmailError.textContent = '';
    registerPasswordError.textContent = '';
    registerSubmit.disabled = true;
    registerName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.header__nav > a, .header__nav > button');
    const advantageCards = document.querySelectorAll('.advantages__card');

    advantageCards.forEach(card => {
        card.style.transform = 'translateX(-100px)';
        card.style.opacity = '0';
    });
    gsap.from(navItems, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
    gsap.to(advantageCards, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
    });
});

