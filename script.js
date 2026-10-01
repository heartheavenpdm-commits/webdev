/* =========================================================
   HEART HEAVEN PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {

    const isOpen = nav?.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    const icon = menuToggle.querySelector("i");

    if (isOpen) {

        icon?.classList.remove("fa-bars");
        icon?.classList.add("fa-xmark");

    } else {

        icon?.classList.remove("fa-xmark");
        icon?.classList.add("fa-bars");

    }

});


/* =========================================================
   CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
========================================================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        nav?.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = menuToggle?.querySelector("i");

        icon?.classList.remove("fa-xmark");
        icon?.classList.add("fa-bars");

    });

});


/* =========================================================
   DARK MODE
========================================================= */

const themeToggle = document.querySelector("#themeToggle");

themeToggle?.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀" : "☾";

    localStorage.setItem(
        "heartHeavenTheme",
        isDark ? "dark" : "light"
    );

});


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem("heartHeavenTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    if (themeToggle) {

        themeToggle.textContent = "☀";

    }

}


/* =========================================================
   SOFT COLOR MODE
========================================================= */

const colorToggle =
    document.querySelector("#colorToggle");

colorToggle?.addEventListener("click", () => {

    document.body.classList.toggle(
        "soft-mode"
    );

    const isSoft =
        document.body.classList.contains(
            "soft-mode"
        );

    localStorage.setItem(
        "heartHeavenColor",
        isSoft ? "soft" : "normal"
    );

});


/* =========================================================
   LOAD SAVED COLOR MODE
========================================================= */

const savedColor =
    localStorage.getItem("heartHeavenColor");

if (savedColor === "soft") {

    document.body.classList.add(
        "soft-mode"
    );

}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = [
    ...document.querySelectorAll(
        "main section[id]"
    )
];

const navLinks = [
    ...document.querySelectorAll(
        ".nav-links a"
    )
];


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        const target =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            target ===
                            `#${entry.target.id}`
                        );

                    });

                }

            });

        },

        {
            rootMargin:
                "-30% 0px -60% 0px",

            threshold: 0
        }

    );


sections.forEach(section => {

    observer.observe(section);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const year =
    document.querySelector("#year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetID
                    );

                if (!target) {

                    return;

                }

                event.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });


/* =========================================================
   PROFILE IMAGE ERROR HANDLING
========================================================= */

const profileImage =
    document.querySelector(
        ".cat-frame img"
    );

profileImage?.addEventListener(
    "error",
    () => {

        console.warn(
            "cat.webp could not be loaded. " +
            "Make sure it is inside the images folder."
        );

    }
);


/* =========================================================
   PROJECT LINK HANDLING
========================================================= */

document
    .querySelectorAll(".project-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (href === "#") {

                    event.preventDefault();

                }

            }
        );

    });


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   VERCEL PROJECTS
========================================================= */

/*
    IMPORTANT:

    DO NOT put your Vercel token here.

    Your token stays inside:

        Vercel
        ↓
        Environment Variables
        ↓
        VERCEL_TOKEN

    This JavaScript only communicates with:

        /api/projects
*/


const projectsGrid =
    document.querySelector(
        "#projectsGrid"
    );


/* =========================================================
   CREATE PROJECT CARD
========================================================= */

function createProjectCard(project) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "project-card";


    /* Project image */

    const imageContainer =
        document.createElement(
            "div"
        );

    imageContainer.className =
        "project-image";


    const image =
        document.createElement(
            "img"
        );

    image.src =
        project.image || "";

    image.alt =
        `${project.name} preview`;

    image.loading =
        "lazy";


    /*
        If screenshot cannot load,
        show a simple placeholder.
    */

    image.addEventListener(
        "error",
        () => {

            imageContainer.classList.add(
                "no-image"
            );

            image.removeAttribute(
                "src"
            );

        }
    );


    imageContainer.appendChild(
        image
    );


    /* Project content */

    const content =
        document.createElement(
            "div"
        );

    content.className =
        "project-content";


    /* Project title */

    const title =
        document.createElement(
            "h3"
        );

    title.textContent =
        project.name;


    /* Project description */

    const description =
        document.createElement(
            "p"
        );

    description.textContent =
        project.description ||
        "A project created and deployed with Vercel.";


    /* Project link */

    const link =
        document.createElement(
            "a"
        );

    link.className =
        "project-link";

    link.href =
        project.url || "#";

    link.target =
        "_blank";

    link.rel =
        "noopener noreferrer";


    link.innerHTML = `
        View Project
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
    `;


    /* Build card */

    content.appendChild(
        title
    );

    content.appendChild(
        description
    );

    content.appendChild(
        link
    );


    card.appendChild(
        imageContainer
    );

    card.appendChild(
        content
    );


    return card;

}


/* =========================================================
   LOAD PROJECTS FROM VERCEL
========================================================= */

async function loadVercelProjects() {

    if (!projectsGrid) {

        console.warn(
            "No #projectsGrid element found."
        );

        return;

    }


    /*
        Loading message
    */

    projectsGrid.innerHTML = `
        <p class="projects-loading">
            Loading projects...
        </p>
    `;


    try {

        /*
            Ask our Vercel serverless function
            for the projects.

            This becomes:

            https://project-lm34t.vercel.app/api/projects
        */

        const response =
            await fetch(
                "/api/projects?t=" +
                Date.now(),
                {
                    method: "GET",

                    cache: "no-store"
                }
            );


        /*
            Check server response
        */

        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        /*
            Convert response to JSON
        */

        const data =
            await response.json();


        /*
            Remove loading message
        */

        projectsGrid.innerHTML = "";


        /*
            Check whether projects exist
        */

        if (
            !data.projects ||
            data.projects.length === 0
        ) {

            projectsGrid.innerHTML = `
                <div class="projects-empty">

                    <i class="fa-solid fa-folder-open"></i>

                    <p>
                        No Vercel projects found.
                    </p>

                </div>
            `;

            return;

        }


        /*
            Create a card for every
            Vercel project
        */

        data.projects.forEach(
            project => {

                const card =
                    createProjectCard(
                        project
                    );

                projectsGrid.appendChild(
                    card
                );

            }
        );


        console.log(
            `${data.projects.length} Vercel project(s) loaded.`
        );


    } catch (error) {

        console.error(
            "Vercel Projects Error:",
            error
        );


        /*
            Show error message
        */

        projectsGrid.innerHTML = `

            <div class="projects-error">

                <i class="fa-solid fa-cloud"></i>

                <h3>
                    Projects unavailable
                </h3>

                <p>
                    Your Vercel projects could not
                    be loaded right now.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   INITIAL PROJECT LOAD
========================================================= */

loadVercelProjects();


/* =========================================================
   AUTOMATIC PROJECT REFRESH
========================================================= */

/*
    Check Vercel every 60 seconds.

    If you deploy a new project,
    the new project can appear
    automatically without changing
    this JavaScript.
*/

setInterval(
    () => {

        loadVercelProjects();

    },
    60000
);


/* =========================================================
   REFRESH WHEN USER RETURNS TO THE TAB
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            loadVercelProjects();

        }

    }
);


/* =========================================================
   FINAL CONSOLE MESSAGE
========================================================= */

console.log(
    "Heart Heaven Portfolio loaded successfully 💗"
);