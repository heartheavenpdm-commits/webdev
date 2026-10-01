/* =========================================================
   VERCEL PROJECTS API
   Heart Heaven Pink Cat Student Portfolio
========================================================= */

module.exports = async function handler(req, res) {

    /* -----------------------------------------------------
       ONLY ALLOW GET REQUESTS
    ----------------------------------------------------- */

    if (req.method !== "GET") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }


    /* -----------------------------------------------------
       GET VERCEL TOKEN FROM ENVIRONMENT VARIABLES
       
       IMPORTANT:
       The token is NOT written in this file.

       Vercel:
       Settings
       → Environment Variables
       → VERCEL_TOKEN
    ----------------------------------------------------- */

    const token =
        process.env.VERCEL_TOKEN;


    if (!token) {

        return res.status(500).json({

            error:
                "VERCEL_TOKEN is not configured."

        });

    }


    try {

        /* -------------------------------------------------
           REQUEST PROJECTS FROM VERCEL
        ------------------------------------------------- */

        const response = await fetch(
            "https://api.vercel.com/v9/projects?limit=100",
            {
                method: "GET",

                headers: {
                    Authorization:
                        `Bearer ${token}`,

                    Accept:
                        "application/json"
                }
            }
        );


        /* -------------------------------------------------
           CHECK VERCEL RESPONSE
        ------------------------------------------------- */

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Vercel API Error:",
                errorText
            );

            return res.status(
                response.status
            ).json({

                error:
                    "Unable to retrieve Vercel projects."

            });

        }


        /* -------------------------------------------------
           CONVERT RESPONSE TO JSON
        ------------------------------------------------- */

        const data =
            await response.json();


        /* -------------------------------------------------
           FORMAT PROJECT DATA
        ------------------------------------------------- */

        const projects =
            (data.projects || []).map(
                project => {

                    /*
                        Try to find the production
                        domain of the project.
                    */

                    let domain = "";


                    /* Production alias */

                    if (
                        project.targets &&
                        project.targets.production &&
                        project.targets.production.alias &&
                        project.targets.production.alias.length > 0
                    ) {

                        domain =
                            project
                                .targets
                                .production
                                .alias[0];

                    }


                    /* General project alias */

                    if (
                        !domain &&
                        project.alias &&
                        project.alias.length > 0
                    ) {

                        domain =
                            project.alias[0];

                    }


                    /*
                        Fallback Vercel domain.

                        Example:
                        project-name.vercel.app
                    */

                    if (!domain) {

                        domain =
                            `${project.name}.vercel.app`;

                    }


                    /* Make sure URL contains https:// */

                    const url =
                        domain.startsWith("http")
                            ? domain
                            : `https://${domain}`;


                    /*
                        Screenshot of the deployed
                        project.

                        This is used as the
                        project card image.
                    */

                    const screenshot =
                        `https://image.thum.io/get/width/1200/crop/750/${encodeURIComponent(url)}`;


                    return {

                        id:
                            project.id,

                        name:
                            project.name,

                        description:
                            project.description ||
                            "A project created and deployed with Vercel.",

                        url:
                            url,

                        image:
                            screenshot

                    };

                }
            );


        /* -------------------------------------------------
           SORT PROJECTS ALPHABETICALLY
        ------------------------------------------------- */

        projects.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );


        /* -------------------------------------------------
           CACHE RESPONSE
           
           This allows Vercel to cache the result
           for a short period while still detecting
           new projects.
        ------------------------------------------------- */

        res.setHeader(
            "Cache-Control",
            "s-maxage=60, stale-while-revalidate=300"
        );


        /* -------------------------------------------------
           SEND PROJECTS TO SCRIPT.JS
        ------------------------------------------------- */

        return res.status(200).json({

            projects:
                projects

        });


    } catch (error) {

        /* -------------------------------------------------
           HANDLE UNEXPECTED ERRORS
        ------------------------------------------------- */

        console.error(
            "Projects API Error:",
            error
        );


        return res.status(500).json({

            error:
                "Something went wrong while loading Vercel projects."

        });

    }

};