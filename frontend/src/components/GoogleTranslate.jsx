import React, { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        // Prevent adding the script multiple times
        if (document.querySelector("script[src*='translate.google.com']")) return;

        // Initialize Google Translate element
        window.googleTranslateElementInit = () => {
            if (!document.getElementById("google_translate_element").hasChildNodes()) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,es,fr,de,it,zh,ja,ar",
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    },
                    "google_translate_element"
                );
            }
        };

        // Create and append the script only once
        const script = document.createElement("script");
        script.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Add custom style
        const style = document.createElement("style");
        style.innerHTML = `
            /* Style the button */
            .goog-te-gadget-simple {
                background-color: #cde5d7 !important;
                border: 1px solid black !important;
                border-radius: 8px !important;
                padding: 6px 10px !important;
            }
            /* Hide the google icon */
            .goog-te-gadget-icon {
                display: none;
            }

            /* Hover effect */
            .goog-te-gadget-simple:hover {
                background-color: #b9dcc8 !important;
            }`;
        document.head.appendChild(style);
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
