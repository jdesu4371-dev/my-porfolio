// script.js - simple jQuery for the portfolio
$(document).ready(function () {

    // 1. Show the current year in the footer
    $("#year").text(new Date().getFullYear());


    // 2. Typing effect
    var words = ["Web Developer", "Student", "Designer", "Problem Solver"];
    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function type() {
        var word = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        $("#typing").text(word.substring(0, charIndex));

        var speed = deleting ? 50 : 100;

        if (!deleting && charIndex === word.length) {
            speed = 1500;          // pause when the word is complete
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }
    type();


    // 3. Header background + back-to-top button when scrolling
    $(window).on("scroll", function () {
        var scrollTop = $(this).scrollTop();

        // header
        if (scrollTop > 50) {
            $("#header").addClass("scrolled");
        } else {
            $("#header").removeClass("scrolled");
        }

        // back-to-top button
        if (scrollTop > 400) {
            $("#to-top").addClass("show");
        } else {
            $("#to-top").removeClass("show");
        }

        // highlight the nav link of the section currently in view
        $("section").each(function () {
            var top = $(this).offset().top - 120;
            var bottom = top + $(this).outerHeight();

            if (scrollTop >= top && scrollTop < bottom) {
                var id = $(this).attr("id");
                $("#nav-menu .nav-link").removeClass("active");
                $('#nav-menu .nav-link[href="#' + id + '"]').addClass("active");
            }
        });
    }).trigger("scroll");

    $("#to-top").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });


    // 4. Mobile menu
    $("#menu-toggle").on("click", function () {
        $("#nav-menu").toggleClass("open");
    });

    // 5. Smooth scrolling for every link that has class nav-link
    $(".nav-link").on("click", function (e) {
        var target = $(this).attr("href");

        if (target.charAt(0) === "#" && $(target).length) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: $(target).offset().top - 70 }, 600);
            $("#nav-menu").removeClass("open");   // close the mobile menu
        }
    });


    // 6. Hide / Show skills
    $(".btn2").on("click", function () {
        $("#skills").slideUp(400);
    });

    $(".btn3").on("click", function () {
        $("#skills").slideDown(400);
    });


    // 7. Projects: hover or click shows a message
    var defaultMessage = $("#project-message").text();

    $(".project-box").on("mouseenter", function () {
        $("#project-message").text("You are viewing: " + $(this).data("title"));
    });

    $(".project-box").on("mouseleave", function () {
        $("#project-message").text(defaultMessage);
    });

    $(".project-box").on("click", function (e) {
        // remove this line when you put your real project links
        if ($(this).attr("href") === "#") {
            e.preventDefault();
        }
        $(".project-box").removeClass("active");
        $(this).addClass("active");
        $("#project-message").text("You selected: " + $(this).data("title"));
    });


    // 8. Contact form validation
    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var topic = $("#topic").val();
        var message = $("#userMessage").val().trim();
        var status = $("#form-status");

        $(".field").removeClass("error");
        status.removeClass("success error");

        if (name === "") {
            $("#name").addClass("error");
            status.addClass("error").text("Please enter your name.");
            return;
        }

        if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            $("#email").addClass("error");
            status.addClass("error").text("Please enter a valid email.");
            return;
        }

        if (topic === "") {
            $("#topic").addClass("error");
            status.addClass("error").text("Please select a topic.");
            return;
        }

        if (message === "") {
            $("#userMessage").addClass("error");
            status.addClass("error").text("Please write a message.");
            return;
        }

        status.addClass("success").text("Thanks, " + name + "! Your message has been sent.");
        this.reset();
    });

    // remove the red border when the user starts typing again
    $(".field").on("input change", function () {
        $(this).removeClass("error");
    });


    // 9. Double-click the logo to switch the color theme
    $("#logo").on("dblclick", function (e) {
        e.preventDefault();
        $("body").toggleClass("alt");
    });

});