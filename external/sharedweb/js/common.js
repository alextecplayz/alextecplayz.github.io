// Check for features in the page head. This enables features listed below
function hasFeature(featureName) {
    const metaTag = document.querySelector(`meta[name="feature-${featureName}"]`);
    return metaTag && metaTag.content === "true";
};

var currentDate = new Date();
var bannerContainer = document.getElementById('bannerContainer');

// Probably works?
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.getAttribute('data-src');
            observer.disconnect();
        }
    });});
    images.forEach(image => {observer.observe(image);});
};
document.addEventListener('DOMContentLoaded', () => {lazyLoadImages();});

// Sticky, scrolling logo that attaches and detaches from the header itself.
if (hasFeature("stickyheader")) {
    document.addEventListener('DOMContentLoaded', function() {
        var headerLogo = document.getElementById('logo');
        var isScrollingDown = false;
        var logoStickyPosition = { top: 1.5 * 16, left: 4.5 * 16 };
        var scrollThreshold = headerLogo.offsetTop - logoStickyPosition.top;
        var isLogoSticky = false;
        var isInitialScroll = true;

        // scroll-linked positioning effect, Firefox will warn about this.
        function handleScroll() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop; // pageYOffset is deprecated, will replace
            var currentScrollDown = scrollY > scrollThreshold;

            if (currentScrollDown !== isScrollingDown) {
                isScrollingDown = currentScrollDown;
                if (isScrollingDown) {
                    headerLogo.classList.add('logo-sticky');
                    isLogoSticky = true;
                } else {
                    headerLogo.classList.remove('logo-sticky');
                    isLogoSticky = false;
                }

                if (isScrollingDown) {
                    headerLogo.style.transform = 'translate(-95%, 0%)';
                } else {
                    headerLogo.style.transform = 'translate(0, 0)';
                }
            }
        }

        window.addEventListener('load', function() {
            headerLogo.style.display = 'block';
            isInitialScroll = false;
        });

        window.addEventListener('scroll', handleScroll);
    });
};

// Language switcher feature, used on the Vanta Interactive website, with sanitization
if (hasFeature("langswitcher")) {
    function langDropdownBtn() {
        var dropdownMenu = document.getElementById('languageDropdownMenu');
        dropdownMenu.classList.toggle('flex');
    }

    document.addEventListener('click', function(event) {
        var dropdownButton = document.getElementById('languageDropdownButton');
        var dropdownMenu = document.getElementById('languageDropdownMenu');

        if (!dropdownButton.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    document.querySelectorAll('#languageDropdownMenu .dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            var lang = event.target.getAttribute('data-lang');
            var sanitizedLang = lang.replace(/[^a-zA-Z0-9-]/g, '');
            var currentUrl = window.location.href;
            var newUrl = currentUrl.replace(/\/[a-z]{2}\//, '/' + sanitizedLang + '/');
            window.location.href = newUrl;
        });
    });
}

// Site settings entry point
if (hasFeature("sitesettings")) {
    const settingsButton = document.getElementById('settings-modal-opener');
    const settingsWindow = document.getElementById('settings-window');
    const settingsWindowClose = document.getElementById('settings-close-button');
    const useLocalStorageCheckbox = document.querySelector('.checkbox-uselocalstorage input');

    function showSettingsWindow() {settingsWindow.style.display = 'flex';}
    function hideSettingsWindow() {settingsWindow.style.display = 'none';}
    settingsButton.addEventListener('click', showSettingsWindow);
    settingsWindowClose.addEventListener('click', hideSettingsWindow);

    if (document.getElementById('paidcontent-content')) {
        function hexToBytes(hex) {
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            return new Uint8Array(bytes);
        }

        async function decryptKey(ciphertextHex, ivHex, authTagHex) {
            const encryptionKeyHex = "f82e23239f46a97f220d448b724c519e16da4db444722fb9920b31620b4bf5fb";
            const encryptionKey = hexToBytes(encryptionKeyHex);
            const iv = hexToBytes(ivHex);
            const authTag = hexToBytes(authTagHex);
            const ciphertext = hexToBytes(ciphertextHex);

            try {
                const cryptoKey = await window.crypto.subtle.importKey(
                    "raw",
                    encryptionKey,
                    { name: "AES-GCM" },
                    false,
                    ["decrypt"]
                );
        
                const decryptedData = await window.crypto.subtle.decrypt(
                    { name: "AES-GCM", iv, additionalData: new Uint8Array(), tagLength: 128 },
                    cryptoKey,
                    new Uint8Array([...ciphertext, ...authTag])
                );
        
                return new TextDecoder().decode(decryptedData);
            } catch (error) {
                console.error("Decryption failed:", error);
                return null;
            }
        }

        const licenseBox = document.getElementById('license-box');
        const paidContentContent = document.getElementById('paidcontent-content');
        const paidContentWindow = document.getElementById('paidcontent-window');

        const licenseForm = document.getElementById('paidcontent-license');
        licenseForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload
            checkLicenseKey();
        });

        async function checkLicenseKey() {
            const licenseKey = licenseBox.value.trim();
            let isValidKey = false;
    
            for (const encryptedKey of window.validKeys) {
                const decryptedKey = await decryptKey(
                    encryptedKey.ciphertext,
                    encryptedKey.iv,
                    encryptedKey.auth_tag
                );
        
                if (decryptedKey === licenseKey) {
                    // Valid license key found
                    paidContentContent.classList.remove('hidden');
                    paidContentWindow.classList.remove('flex');
                    isValidKey = true; // Set flag to true
                    // Decrypt post content
                    const encryptedPostContent = document.querySelector('#paidcontent-content p').innerText;
                    await decryptPostContent(encryptedPostContent);
                    break; // Exit loop once we find a match
                }
            }
        
            if (!isValidKey) {
                alert("Invalid license key. Please try again.");
            }
        }

        async function decryptPostContent(encryptedContent) {
            try {
                // Parse JSON from the encrypted content string
                const parsedContent = JSON.parse(encryptedContent.replace(/“/g, '"').replace(/”/g, '"'));
                const ciphertext = parsedContent.ciphertext;
                const iv = parsedContent.iv;
                const authTag = parsedContent.auth_tag;
        
                // Decrypt using AES-GCM
                const decryptedHTML = await decryptKey(ciphertext, iv, authTag);
                
                // Display decrypted content if successful
                if (decryptedHTML) {
                    paidContentContent.innerHTML = decryptedHTML; // Set inner HTML to decrypted content
                    paidContentContent.classList.remove('hidden'); // Show the content
                    paidContentWindow.style.display = 'none'; // Hide warning window
                } else {
                    alert("Failed to decrypt content.");
                }
            } catch (error) {
                console.error("Error parsing or decrypting post content:", error);
            }
        }          

        function loadLicenseSettings() {
            const license = localStorage.getItem('license') || sessionStorage.getItem('license');
            if (license) {licenseBox.value = license; checkLicenseKey();}
        }

        function saveLicenseSettings() {
            const useLocalStorage = useLocalStorageCheckbox.checked;
            const license = licenseBox.value;

            if (useLocalStorage) {
                localStorage.setItem('license', license);
            } else {
                sessionStorage.setItem('license', license);
                localStorage.removeItem('license');
            }
        }

        loadLicenseSettings();
        useLocalStorageCheckbox.addEventListener('change', saveLicenseSettings);
        licenseBox.addEventListener('input', saveLicenseSettings); 
    }

    // Theming and effects support.
    if (hasFeature("theming")) {
        const themeSelect = document.getElementById('setting_theme');
        const effectOverlay = document.getElementById('effect-overlay');
        const effectsSelect = document.getElementById('setting_effects');
        
        // We're saving and loading from local or session storage. Not using cookies at all, there's no reason to.
        function loadThemeSettings() {
            const useLocalStorage = localStorage.getItem('useLocalStorage') === 'true' || sessionStorage.getItem('useLocalStorage') === 'true';
            const theme = localStorage.getItem('theme') || sessionStorage.getItem('theme');
            const effect = localStorage.getItem('effect') || sessionStorage.getItem('effect');

            if (useLocalStorage) {useLocalStorageCheckbox.checked = true;} else {useLocalStorageCheckbox.checked = false;}
            if (theme) {themeSelect.value = theme; updateTheme(theme);}
            if (effect) {effectsSelect.value = effect; applyEffect(effect);}
        }

        function saveThemeSettings() {
            const useLocalStorage = useLocalStorageCheckbox.checked;
            const theme = themeSelect.value;
            const effect = effectsSelect.value;

            if (useLocalStorage) {
                localStorage.setItem('theme', theme);
                localStorage.setItem('effect', effect);
                localStorage.setItem('useLocalStorage', 'true');
            } else {
                sessionStorage.setItem('theme', theme);
                sessionStorage.setItem('effect', effect);
                sessionStorage.setItem('useLocalStorage', 'false');
                localStorage.removeItem('theme');
                localStorage.removeItem('effect');
                localStorage.removeItem('useLocalStorage');
            }

            const iframe = document.getElementById('comments-iframe');
            if (iframe) {iframe.contentWindow.postMessage({ type: 'set-theme', theme: theme }, '*');}
        }

        // By default, use Obsidian Gray theme, before loading any settings.
        themeSelect.value = 'theme_obsidiangray';
        loadThemeSettings();

        function updateTheme(theme) {
            const root = document.documentElement;
            switch (theme) {
                // This is where themes are declared.
                // 'Main' themes
                case 'theme_obsidiangray':
                    root.style.setProperty('--black', '#000000'); root.style.setProperty('--white', '#ffffff');
                    root.style.setProperty('--darkgray', '#3a3a3a'); root.style.setProperty('--lightgray', '#c5c5c5');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#dd8ac8');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#242424');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;
                case 'theme_calcitewhite':
                    root.style.setProperty('--black', '#ffffff'); root.style.setProperty('--white', '#000000');
                    root.style.setProperty('--darkgray', '#c5c5c5'); root.style.setProperty('--lightgray', '#3a3a3a');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#cc4fad');
                    root.style.setProperty('--magenta', '#99099e'); root.style.setProperty('--vantagray', '#D4D4D4');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#ed333b');
                    root.style.setProperty('--caution', '#ff7800'); root.style.setProperty('--pass', '#41a82c');
                break;
                case 'theme_amoledblack':
                    root.style.setProperty('--black', '#000000'); root.style.setProperty('--white', '#ffffff');
                    root.style.setProperty('--darkgray', '#3a3a3a'); root.style.setProperty('--lightgray', '#c5c5c5');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#dd8ac8');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#000000');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;

                // Extra themes
                // Product themes
                case 'theme_prisoniadark':
                    root.style.setProperty('--black', '#222'); root.style.setProperty('--white', '#f90');
                    root.style.setProperty('--darkgray', '#293235'); root.style.setProperty('--lightgray', '#a7b2bf');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#ce7cb9');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#17202b');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;
                case 'theme_odysseydark':
                    root.style.setProperty('--black', '#222'); root.style.setProperty('--white', '#F77');
                    root.style.setProperty('--darkgray', '#35292d'); root.style.setProperty('--lightgray', '#bfa7a7');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#ce7cb9');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#252126');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;
                
                // Custom
                case 'theme_lightgold':
                break;
                case 'theme_darkgold':
                    root.style.setProperty('--black', '#4d471b'); root.style.setProperty('--white', '#ffe300');
                    root.style.setProperty('--darkgray', '#4a472b'); root.style.setProperty('--lightgray', '#ccba83');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#df66c1');
                    root.style.setProperty('--magenta', '#df66c1'); root.style.setProperty('--vantagray', '#242424');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;
                case 'theme_brightbook':
                    root.style.setProperty('--black', '#ffffff'); root.style.setProperty('--white', '#6b5949');
                    root.style.setProperty('--darkgray', '#ead7c2'); root.style.setProperty('--lightgray', '#6b5949');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#cc4fad');
                    root.style.setProperty('--magenta', '#99099e'); root.style.setProperty('--vantagray', '#f5ebe1');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#ed333b');
                    root.style.setProperty('--caution', '#ff7800'); root.style.setProperty('--pass', '#41a82c');
                break;
                case 'theme_sunnyocean':
                    root.style.setProperty('--black', '#90e0ef'); root.style.setProperty('--white', '#023e8a');
                    root.style.setProperty('--darkgray', '#ade8f4'); root.style.setProperty('--lightgray', '#03045e');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#cc4fad');
                    root.style.setProperty('--magenta', '#99099e'); root.style.setProperty('--vantagray', '#caf0f8');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#ed333b');
                    root.style.setProperty('--caution', '#ff7800'); root.style.setProperty('--pass', '#41a82c');
                break;
                case 'theme_deepocean':
                    root.style.setProperty('--black', '#03045e'); root.style.setProperty('--white', '#caf0f8');
                    root.style.setProperty('--darkgray', '#0077b6'); root.style.setProperty('--lightgray', '#ade8f4');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#dd8ac8');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#023e8a');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;
                case 'theme_sunnyforest':
                    root.style.setProperty('--black', '#d7fb95'); root.style.setProperty('--white', '#000000');
                    root.style.setProperty('--darkgray', '#a0c496'); root.style.setProperty('--lightgray', '#2b2b2b');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#cc009f');
                    root.style.setProperty('--magenta', '#cc009f'); root.style.setProperty('--vantagray', '#C3E8B5');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#ed333b');
                    root.style.setProperty('--caution', '#ff7800'); root.style.setProperty('--pass', '#7bed68');
                break;
                case 'theme_darkforest':
                    root.style.setProperty('--black', '#204a11'); root.style.setProperty('--white', '#b4ffa5');
                    root.style.setProperty('--darkgray', '#06400f'); root.style.setProperty('--lightgray', '#bfdbb2');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#dd8ac8');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#132f00');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#cc565c');
                    root.style.setProperty('--caution', '#ff9d47'); root.style.setProperty('--pass', '#5dc948');
                break;
                case 'theme_deeppastelpink':
                    root.style.setProperty('--black', '#FFC2D1'); root.style.setProperty('--white', '#FB6F92');
                    root.style.setProperty('--darkgray', '#FFB3C6'); root.style.setProperty('--lightgray', '#AC2C4C');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#cc009f');
                    root.style.setProperty('--magenta', '#cc009f'); root.style.setProperty('--vantagray', '#FFE5EC');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#ed333b');
                    root.style.setProperty('--caution', '#ff7800'); root.style.setProperty('--pass', '#7bed68');
                break; // from https://coolors.co/palette/ffe5ec-ffc2d1-ffb3c6-ff8fab-fb6f92
                case 'theme_m3darkpink':
                    root.style.setProperty('--black', '#251723'); root.style.setProperty('--white', '#ffaaf5');
                    root.style.setProperty('--darkgray', '#443441'); root.style.setProperty('--lightgray', '#ffaaf5');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#dd8ac8');
                    root.style.setProperty('--magenta', '#fcb5ff'); root.style.setProperty('--vantagray', '#291b27');
                    root.style.setProperty('--warning', '#ee7a49'); root.style.setProperty('--danger', '#ff5359');
                    root.style.setProperty('--caution', '#ffda92'); root.style.setProperty('--pass', '#62ac09');
                break;
                case 'theme_cream':
                    root.style.setProperty('--black', '#fdecdb'); root.style.setProperty('--white', '#621200');
                    root.style.setProperty('--darkgray', '#cebcae'); root.style.setProperty('--lightgray', '#a64028');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#cc4fad');
                    root.style.setProperty('--magenta', '#99099e'); root.style.setProperty('--vantagray', '#f0dece');
                    root.style.setProperty('--warning', '#f8ff9c'); root.style.setProperty('--danger', '#ed333b');
                    root.style.setProperty('--caution', '#ff7800'); root.style.setProperty('--pass', '#41a82c');
                break;

                // Catppuccin
                case 'theme_catlatte':
                    root.style.setProperty('--black', '#dce0e8'); root.style.setProperty('--white', '#4c4f69');
                    root.style.setProperty('--darkgray', '#eff1f5'); root.style.setProperty('--lightgray', '#5c5f77');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#ea76cb');
                    root.style.setProperty('--magenta', '#ea76cb'); root.style.setProperty('--vantagray', '#dce0e8');
                    root.style.setProperty('--warning', '#D1C252'); root.style.setProperty('--danger', '#D15254');
                    root.style.setProperty('--caution', '#D18052'); root.style.setProperty('--pass', '#78D152');
                break;
                case 'theme_catfrappe':
                    root.style.setProperty('--black', '#232634'); root.style.setProperty('--white', '#c6d0f5');
                    root.style.setProperty('--darkgray', '#303446'); root.style.setProperty('--lightgray', '#b5bfe2');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#f4b8e4');
                    root.style.setProperty('--magenta', '#f4b8e4'); root.style.setProperty('--vantagray', '#232634');
                    root.style.setProperty('--warning', '#E0AF46'); root.style.setProperty('--danger', '#BF6D6D');
                    root.style.setProperty('--caution', '#E87F2A'); root.style.setProperty('--pass', '#81B07D');
                break;
                case 'theme_catmacchi':
                    root.style.setProperty('--black', '#181926'); root.style.setProperty('--white', '#cad3f5');
                    root.style.setProperty('--darkgray', '#24273a'); root.style.setProperty('--lightgray', '#b8c0e0');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#f5bde6');
                    root.style.setProperty('--magenta', '#f5bde6'); root.style.setProperty('--vantagray', '#181926');
                    root.style.setProperty('--warning', '#E0AF46'); root.style.setProperty('--danger', '#BF6D6D');
                    root.style.setProperty('--caution', '#E87F2A'); root.style.setProperty('--pass', '#81B07D');
                break;
                case 'theme_catmocha':
                    root.style.setProperty('--black', '#11111b'); root.style.setProperty('--white', '#cdd6f4');
                    root.style.setProperty('--darkgray', '#1e1e2e'); root.style.setProperty('--lightgray', '#bac2de');
                    root.style.setProperty('--brand', '#a0a0a0'); root.style.setProperty('--accent-color', '#f5c2e7');
                    root.style.setProperty('--magenta', '#f5c2e7'); root.style.setProperty('--vantagray', '#11111b');
                    root.style.setProperty('--warning', '#E0AF46'); root.style.setProperty('--danger', '#BF6D6D');
                    root.style.setProperty('--caution', '#E87F2A'); root.style.setProperty('--pass', '#81B07D');
                break;
            }
        }

        function applyEffect(effect) {
            effectOverlay.textContent = '';

            switch (effect) {
                // This is where effects are defined
                case 'effect_vignette':
                    const vignette = document.createElement('div');
                    vignette.className = 'vignette';
                    effectOverlay.appendChild(vignette);
                break;
                case 'effect_rain':
                    const rainSky = document.createElement('div');
                    rainSky.className = 'rain-sky';
                    effectOverlay.appendChild(rainSky);
            
                    const totalRaindrops = 100;
                    for (let i = 0; i < totalRaindrops; i++) {
                      const raindrop = document.createElement('div');
                      raindrop.classList.add('raindrop');
                      raindrop.style.left = Math.random() * 100 + 'vw';
                      raindrop.style.top = -Math.random() * 750 + 'px';
                      const duration = Math.random() * (1 - 0.5) + 0.5;
                      raindrop.style.animationDuration = duration + 's';
                      raindrop.style.animationDelay = Math.random() * duration + 's';
                      const horizontalMovement = (Math.random() * 20 - 10) + 'px';
                      raindrop.style.transform = `translateX(${horizontalMovement})`;
                      rainSky.appendChild(raindrop);
                    }              
                break;
                case 'effect_snow':
                    const snowSky = document.createElement('div');
                    snowSky.className = 'snow-sky';
                    effectOverlay.appendChild(snowSky);

                    const totalSnowflakes = 200;
                    for (let i = 0; i < totalSnowflakes; i++) {
                      const snowflake = document.createElement('div');
                      snowflake.classList.add('snowflake');
                      snowflake.style.left = Math.random() * 100 + 'vw';
                      snowflake.style.top = -Math.random() * 750 + 'px';
                      snowflake.style.animationDuration = Math.random() * (30 - 10) + 10 + 's';
                      snowflake.style.animationDelay = Math.random() * 5 + 's';
                      snowflake.style.opacity = Math.random();
                      snowSky.appendChild(snowflake);
                    }
                break;
                case 'effect_lightrope':
                    const lightropeBackground = document.createElement('div');
                    lightropeBackground.className = 'lightrope-background';
                    effectOverlay.appendChild(lightropeBackground);

                    const lightrope = document.createElement('ul');
                    lightrope.className = 'lightrope';
                    lightropeBackground.appendChild(lightrope);

                    const totalLights = 42;
                    for (let i = 0; i < totalLights; i++) {
                      const light = document.createElement('li');
                      lightrope.appendChild(light);
                    }
                break;
                case 'effect_none':
                default:
                    effectOverlay.textContent = '';
                break;
            }
        }

        themeSelect.addEventListener('change', () => {
            const theme = themeSelect.value;
            updateTheme(theme);
            saveThemeSettings();
        });

        effectsSelect.addEventListener('change', () => {
            const effect = effectsSelect.value;
            applyEffect(effect);
            saveThemeSettings();
        });

        useLocalStorageCheckbox.addEventListener('change', saveThemeSettings);
        document.addEventListener('DOMContentLoaded', () => {
            loadThemeSettings();
            const theme = themeSelect.value;
            const effect = effectsSelect.value;
            updateTheme(theme);
            applyEffect(effect);
        });
    };
};

// Sidebar feature, used on VI Docs
if (hasFeature("sidebar")) {
    function sidebarProjectDropdownBtn() {
        var projectDropdownMenu = document.getElementById('projectDropdownMenu');
        projectDropdownMenu.classList.toggle('flex');
    };
    
    document.addEventListener('click', function(event) {
        var projectDropdownButton = document.getElementById('projectDropdownButton');
        var projectDropdownMenu = document.getElementById('projectDropdownMenu');
        
        if (!projectDropdownButton.contains(event.target)) {
            projectDropdownMenu.classList.remove('show');
        }
    });

    document.querySelectorAll('#projectDropdownMenu .sidebar-dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            var project = event.target.getAttribute('data-project');
            var currentUrl = window.location.href;
            var langRegex = /\/[a-z]{2}\//;
            var langMatch = currentUrl.match(langRegex);
            var lang = langMatch ? langMatch[0].replace(/\//g, '') : '';
            var baseUrl = currentUrl.replace(langRegex, '/' + lang + '/');
            var newUrl = siteBaseUrl + (lang ? lang + '/' : '') + project + '/';
            window.location.href = newUrl;
        });
    });

    function adjustContentWidth() {
        var sidebar = document.getElementById('sidebar');
        var docColumnRight = document.querySelector('.doc-column-right');
        
        if (sidebar.classList.contains('sidebar-collapsed')) {
            docColumnRight.style.paddingLeft = '0';
        } else {
            var sidebarWidth = sidebar.offsetWidth;
            docColumnRight.style.paddingLeft = sidebarWidth + 'px';
        }
    }
    
    function sidebarCollapseButton() {
        var sidebar = document.getElementById('sidebar');
        var sidebarBrand = document.getElementById('sidebar-branding');
        var sidebarBrandlogo = document.getElementById('branding-logo');
        var sidebarBrandname = document.getElementById('branding-name');
        var sidebarContent = document.getElementById('sidebar-content');
        var sidebarCollapseButton = document.getElementById('sidebarCollapseButton');
        
        sidebar.classList.toggle('sidebar-collapsed');
        sidebarContent.classList.toggle('hidden');
        sidebarBrand.classList.toggle('flex');
        sidebarBrandlogo.classList.toggle('hidden');
        sidebarBrandname.classList.toggle('hidden');
        
        setTimeout(function() {adjustContentWidth();}, 300);
    };
    
    window.onload = function() {adjustContentWidth();};
    window.onresize = function() {adjustContentWidth();};
};

// Video player feature, used on VI for game pages.
if (hasFeature("videoplayer")) {
    document.addEventListener('DOMContentLoaded', function() {
        var video = document.getElementById('landing-video');
        var button = document.getElementById('video-control-btn');
        
        if (video.paused) {button.textContent = '⏵';} else {button.textContent = '⏸';}
        
        button.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                button.textContent = '⏸';
            } else {
                video.pause();
                button.textContent = '⏵';
            }
        });
    });
};

// Progress bar animations
if (hasFeature("progress")) {
    window.addEventListener("load", function() {
        var progressBars = document.querySelectorAll(".progress-bar");
        progressBars.forEach(
            function(progressBar) {
                var desiredPercentage = progressBar.dataset.progress;
                progressBar.style.width = desiredPercentage + "%";
            }
        );
    });
};

// Sticky table of contents feature. Used on posts and pages that use ToCs, on ATP, VI and VI Docs websites.
if (hasFeature("stickypostheader")) {
    document.addEventListener('DOMContentLoaded', function() {
        var postHeader = document.getElementById('post-header');
        var isScrollingDown = false;
        var headerStickyPosition = { top: 1.5 * 16, };
        var scrollThreshold = postHeader.offsetTop - headerStickyPosition.top;
        var isHeaderSticky = false;
        var isInitialScroll = true;

        function handleScroll() {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            var currentScrollDown = scrollY > scrollThreshold;
            
            if (currentScrollDown !== isScrollingDown) {
                isScrollingDown = currentScrollDown;
                if (isScrollingDown) {
                    postHeader.classList.add('post-header-sticky');
                } else {
                    postHeader.classList.remove('post-header-sticky');
                }
                
                if (isScrollingDown) {
                    postHeader.style.transition = 'transform 0.15s ease-in-out';
                    postHeader.style.transform = 'translate(0, 0%)';
                } else {
                    postHeader.style.transition = 'transform 0.15s ease-in-out';
                    postHeader.style.transform = 'translate(0, 0)';
                }
            }
            
            if (!isScrollingDown && !isHeaderSticky) {
                postHeader.style.border = 'none';
            } else {
                postHeader.style.border = '0.15rem solid var(--white)';
            }
        }
        
        function setInitialBorderWidths() {
            postHeader.style.borderTopWidth = postHeader.offsetHeight + 'px';
            postHeader.style.borderRightWidth = postHeader.offsetWidth + 'px';
            postHeader.style.borderBottomWidth = postHeader.offsetHeight + 'px';
            postHeader.style.borderLeftWidth = postHeader.offsetWidth + 'px';
        }
        
        window.addEventListener('load', function() {
            postHeader.style.display = 'block';
            setInitialBorderWidths();
            isInitialScroll = false;
        });
    
        window.addEventListener('scroll', handleScroll);
    });
};

// Hides the footer. Used on the iframe.
if (hasFeature("nofooter")) {
    document.addEventListener('DOMContentLoaded', function() {
        footer = document.getElementById('footer');
        footer.style.display = 'none';
    })
};

// Gets all elements that have the format <a data-share-url="" data-share-title="" data-share-description="" data-share-date="" data-share-thumbnail="">
// Creates a share item for each, extracts the data attribute, checks for Web Share API support, and then creates one share dialog with those attributes
// That is opened by pressing the according share button. Works on /search, /pages, index, posts and pages on the ATP website, may be used on VI later
if (document.querySelectorAll('a[data-share-url][data-share-title][data-share-description][data-share-date][data-share-thumbnail]')) {
    function refreshShareItems() {
        async function shareItem(event) {
            event.preventDefault();
            const linkElement = event.currentTarget;
  
            // Extract data attributes
            const url = linkElement.getAttribute('data-share-url');
            const title = linkElement.getAttribute('data-share-title');
            const description = linkElement.getAttribute('data-share-description');
            const thumbnail = linkElement.getAttribute('data-share-thumbnail');
            const date = linkElement.getAttribute('data-share-date');
  
            // Check for Web Share API support
            if (navigator.share) {
                const shareData = {
                    title,
                    text: `${description}\n\nPublished on: ${date}\n\nThumbnail: ${thumbnail}`,
                    url,
                };
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Error sharing:', err);
                }
            } else {
                // Fallback to custom dialog or share drawer
                openShareDialog({ url, title, description, date, thumbnail });
            }
        }
  
        // Open custom share dialog
        function openShareDialog({ url, title, description, date, thumbnail }) {
            // Create dialog container
            const dialogContainer = document.createElement('div');
            dialogContainer.className = 'custom-share-dialog';
  
            // Create dialog content
            dialogContainer.innerHTML = `
                <div class="pop-up share-pop-up z-index100">
                    <button class="close-bottom-sheet"></button>
                    <div class="pop-up-content open">
                        <div class="pop-up-content-titlebar">
                            <p class="flex centered grotesk semibold rem2 white pop-up-title">Share this:</p>
                        </div>
                        <div class="pop-up-scrollbox">
                            <div class="article">
                                <div class="article-left">
                                    <img class="article-image-size" src="${thumbnail}">
                                </div>
                                <div class="article-right">
                                    <p class="article-title rem2 white grotesk semibold">${title}</p>
                                    <p class="article-desc rem1 lightgray semibold monospace italic">${description}</p>
                                    <p class="article-date rem1 lightgray grotesk bold">${date}</p>
                                    <div class="article-button-container">
                                        <a class="article-button-light grotesk medium" id="copy-url"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="link" class="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> Copy URL</a>
                                        <a class="article-button-light grotesk medium" id="copy-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="receipt-text" class="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M14 8H8"></path><path d="M16 12H8"></path><path d="M13 16H8"></path></svg> Copy information</a>
                                    </div>
                                </div>
                            </div>
                            <p class="monospace lightgray medium rem1-25">&emsp;</p>
                            <p class="monospace lightgray medium rem1 pop-up-title">Click or tap anywhere outside this dialog to close it.</p>
                        </div>
                    </div>
                </div>
            `;
  
            // Add to document
            document.body.appendChild(dialogContainer);

            setTimeout(() => {
                const copyUrlButton = document.getElementById('copy-url');
                const copyInfoButton = document.getElementById('copy-info');
                const closeButton = dialogContainer.querySelector('.close-bottom-sheet');
            
                if (copyUrlButton && copyInfoButton && closeButton) {
                    copyUrlButton.addEventListener('click', () => {
                        navigator.clipboard.writeText(url);
                    });
            
                    copyInfoButton.addEventListener('click', () => {
                        const info = `A post from AlexTECPlayz' blog: ${title}\nDescription: ${description}\nPublished on: ${date}\nRead more: ${url}`;
                        navigator.clipboard.writeText(info);
                    });
            
                    closeButton.addEventListener('click', () => {
                        document.body.removeChild(dialogContainer);
                    });
                } else {
                  console.error('Failed to locate share dialog buttons.');
                }
            }, 0);
        }
  
        const shareLinks = document.querySelectorAll(
          'a[data-share-url][data-share-title][data-share-description][data-share-date][data-share-thumbnail]'
        );
  
        shareLinks.forEach((link) => {
          link.addEventListener('click', shareItem);
        });
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      refreshShareItems();
    });
}