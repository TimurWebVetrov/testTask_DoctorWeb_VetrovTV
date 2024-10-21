window.addEventListener('load', function() {
    window.setTimeout(function() {
        document.body.classList.add('loaded_hiding');
    }, 1500); 

    window.setTimeout(function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 2000); 
});

document.querySelector('.btn').addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (!isVisible) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } 
    }
});

function handleHeader() {
    const scrollPosition = window.scrollY || window.pageYOffset;

    const headerWrapper = document.querySelector('.header__wrapper');
    const discountBox = document.querySelector('.header__discount-box');

    const isWideScreen = window.innerWidth >= 1024;
    const maxShift = isWideScreen ? 550 : 250; 
    const discountOpacityFactor = isWideScreen ? 350 : 275; 

    headerWrapper.style.transform = `translateY(${Math.min(scrollPosition * 0.5, maxShift)}px)`;
    discountBox.style.opacity = Math.max(1 - (scrollPosition / discountOpacityFactor), 0);
}

function handleAdvantage() {
    const advantageBlocks = document.querySelectorAll('.advantage__block');
    const windowHeight = window.innerHeight;

    advantageBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const opacityValue = Math.min(1, (windowHeight - rect.top) / 300);
            block.style.opacity = opacityValue; 
        } else {
            block.style.opacity = 0;
        }
    });
}

window.addEventListener('scroll', function() {
    handleHeader();
    handleAdvantage();
});

window.dispatchEvent(new Event('scroll'));