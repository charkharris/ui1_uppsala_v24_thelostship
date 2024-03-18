    /* 

    Charlotte worked on this

    */
$(document).ready(function () {
    const locale = 'en';
    let translations = {};

    document.addEventListener('DOMContentLoaded', () => {

        setLocale(locale);

    });

    // Drop down in HTML
    const switcher = document.getElementById('localization-switcher');

    // Updates switcher on change through drop down
    switcher.onchange = (e) => {

        setLocale(e.target.value);

    };

    // Enables translation to be loaded before page updates
    const setLocale = async (newLocale) => {

        translations = await fetchTranslations(newLocale);

        translatePage();

    };

    // Fetch prior to update, log if there is some error
    const fetchTranslations = async (newLocale) => {

        const response = await fetch(`lang/${newLocale}.json`);

        if (!response.ok) {

            console.log(`Could not fetch translations for locale ${newLocale}`);

        }

        return await response.json();

    };

    // Update page contents
    function translatePage() {

        document.querySelectorAll('[localization-key]').forEach((element) => {

            let key = element.getAttribute('localization-key');

            let translation = translations[key];

            element.innerText = translation;

        });

    }
   
    setLocale('en');

});