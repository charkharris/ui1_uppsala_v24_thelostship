$(document).ready(function () {
  const locale = "en";
  let translations = {};
  let englishTranslations = {}; // Store English translations permanently

  document.addEventListener("DOMContentLoaded", () => {
    // No need to setLocale here, as it's called after fetching English translations
  });

  // Drop down in HTML
  const switcher = document.getElementById("localization-switcher");

  // Updates switcher on change through drop down
  switcher.onchange = (e) => {
    setLocale(e.target.value);
  };

  // Enables translation to be loaded before page updates
  const setLocale = async (newLocale) => {
    translations = await fetchTranslations(newLocale);
    translatePage();
  };

  // Fetch prior to update, default to English if translation not found
  const fetchTranslations = async (newLocale) => {
    let response;
    try {
      response = await fetch(`lang/${newLocale}.json`);
      if (!response.ok) {
        throw new Error("Translation file not found");
      }
    } catch (error) {
      // If translation file not found, default to English
      console.log(`Could not fetch translations for locale ${newLocale}. Defaulting to English.`);
      return englishTranslations; // Return English translations as fallback
    }

    return await response.json();
  };

  // Update page contents
  function translatePage() {
    document.querySelectorAll("[localization-key]").forEach((element) => {
      let key = element.getAttribute("localization-key");

      // Check if translation exists in the current locale
      if (translations.hasOwnProperty(key)) {
        element.innerText = translations[key];
      } else {
        // Fallback to English translation
        if (englishTranslations.hasOwnProperty(key)) {
          console.log('defaulting to english!!')
          element.innerText = englishTranslations[key];
        } else {
          // If key not found in English translation, set element to UNKNOWN (should not happen)
          element.innerText = `UNKNOWN`;
        }
      }
    });
  }

  // Fetch English translations at the beginning
  fetchTranslations("en")
    .then(data => {
      englishTranslations = data;
      setLocale(locale); // Call setLocale after fetching English translations to get the actual locale user wants
    })
    .catch(error => {
      console.error("Failed to fetch English translations:", error);
    });

});