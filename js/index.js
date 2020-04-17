document.addEventListener("DOMContentLoaded", event => {
    //#region HEADER MENU
    const menu = document.getElementById("menu");
    const burger = document.getElementById("burger");
    const menuPush = document.getElementById("menu-push");
    const inlineStyle = document.getElementById("inline-style");
    const themeButtons = document.querySelectorAll(".color-picker__link");
    const colorPickerButton = document.getElementById("color-picker-button");
    const backgroundProfileSlides = document.querySelectorAll(".background-profile__slider");

    const menuObj = {
        menuLinks: [{
                linkTo: "index.html",
                linkName: "Hjem",
            },
            {
                linkTo: "gallery.html",
                linkName: "Galleri",
            },
            {
                linkTo: "about.html",
                linkName: "Om",
            },
        ],
    }

    const colorThemes = {
        coffee: {
            offLight: "#E6DDD8",
            offDark: "#271b19",
            light: "#c08670",
            dark: "#5a332c",
        },
        mint: {
            offLight: "#fefefe",
            offDark: "#707070",
            light: "#bcdfde",
            dark: "#92b8b7",
        },
        lemon: {
            offLight: "#e4eed3",
            offDark: "#594302",
            light: "#b6da84",
            dark: "#437007",
        },
        cherry: {
            offLight: "#ffe3e5",
            offDark: "#401D16",
            light: "#f098a0",
            dark: "#73141B",
        },
    }

    const timeout = 8000;
    const transition = 8000;
    let slideIndex = 0;

    setInlineStyle("coffee");
    createMenuLinks();

    burger.addEventListener("click", menuToggle);
    colorPickerButton.addEventListener("click", function(e) {
        e.preventDefault();
        menuToggle(e);
    })

    for (let i = 0; i < themeButtons.length; i++) {
        const themeButton = themeButtons[i];
        themeButton.addEventListener("click", function(e) {
            e.preventDefault();
            setInlineStyle(themeButton.dataset.label);
            menuHide();
            resetThemeButtons();
            themeButton.classList.add("js-active");
        });
    }

    if (backgroundProfileSlides.length > 0) {
        for (let i = 0; i < backgroundProfileSlides.length; i++) {
            const backgroundProfileSlide = backgroundProfileSlides[i];
            backgroundProfileSlide.style = `transition: opacity ${transition}ms; animation-duration: ${timeout + transition + 4000}ms;`;
        }
        setTimeout(() => {
            changeSlide();
        }, timeout + transition);
    }

    function menuToggle(e) {
        e.preventDefault();
        menu.classList.toggle("js-active");
        menuPush.classList.toggle("js-active");
    }

    // function menuShow() {
    //     menu.classList.add("js-active");
    //     menuPush.classList.add("js-active");
    // }

    function menuHide() {
        menu.classList.remove("js-active");
        menuPush.classList.remove("js-active");
    }

    function resetThemeButtons() {
        for (let i = 0; i < themeButtons.length; i++) {
            const themeButton = themeButtons[i];
            themeButton.classList.remove("js-active");
        }
    }

    function createMenuLinks() {
        for (let i = 0; i < menuObj.menuLinks.length; i++) {
            const menuLink = menuObj.menuLinks[i];
            let link = document.createElement("A");
            link.href = menuLink.linkTo;
            link.textContent = menuLink.linkName;
            menu.appendChild(link);
        }
    }

    function setInlineStyle(themeName) {
        inlineStyle.innerHTML = `:root{
            --off-light: ${colorThemes[themeName].offLight};
            --off-dark: ${colorThemes[themeName].offDark};
            --light: ${colorThemes[themeName].light};
            --dark: ${colorThemes[themeName].dark};
        }`;

    }

    function changeSlide() {
        const prevSlideIndex = slideIndex;
        slideIndex++;
        if (slideIndex >= backgroundProfileSlides.length) {
            slideIndex = 0;
        }
        backgroundProfileSlides[prevSlideIndex].classList.add("js-inactive");
        backgroundProfileSlides[slideIndex].classList.add("js-active");
        backgroundProfileSlides[slideIndex].classList.remove("js-inactive");
        setTimeout(() => {
            backgroundProfileSlides[prevSlideIndex].classList.remove("js-active");
            changeSlide();
        }, timeout + transition);
    }
    //#endregion HEADER MENU
});

//#region GOOGLE MAPS

//(Remember to keep this code outside the
//DOMContentLoaded/window.onload functions)

//Help with styling/manipulating the map (API functionality):
//https://developers.google.com/maps/documentation/javascript/examples/

const googleMap = document.getElementById("google-map");

if (googleMap) {
    const cphArchitects = {
        lat: parseFloat(googleMap.dataset.markerLat),
        lng: parseFloat(googleMap.dataset.markerLng)
    };

    function initMap() {
        const map = new google.maps.Map(
            googleMap, {
                zoom: 18,
                center: cphArchitects
            });
        const contentString = `
            <div id="content">
                <h2>CPH Architects</h2>
                <p>Her bor vi.</p>
            </div>
        `;
        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        const marker = new google.maps.Marker({
            position: cphArchitects,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'CPH Architects'
        });
        infowindow.open(map, marker);
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }
}
//#endregion GOOGLE MAPS