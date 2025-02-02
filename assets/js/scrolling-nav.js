/*
//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 9000, 'easeInOutExpo');
        event.preventDefault();
    });
});
*/
// Smooth scroll function
function smoothScroll(target, duration) {
    // Get the target element
    const targetElement = document.querySelector(target);
    if (!targetElement) return; // Exit if the target doesn't exist

    // Calculate the target position
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Animation function
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // Easing function (easeInOutQuad)
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);

        // Scroll to the calculated position
        window.scrollTo(0, run);

        // Continue animation until the duration is reached
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Easing function for smooth acceleration and deceleration
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Start the animation
    requestAnimationFrame(animation);
}

// Add event listeners to all anchor links with hash href
document.querySelectorAll('.onepage-nev a.nav-link, .mobile-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const target = this.getAttribute('href'); // Get the target ID
        const duration = 9000; // Adjust the duration (in milliseconds) for scroll speed
        smoothScroll(target, duration); // Call the smooth scroll function
    });
});
