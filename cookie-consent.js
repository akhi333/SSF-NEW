// Cookie Consent Banner Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already consented
    if (!localStorage.getItem('cookieConsent')) {
        showCookieBanner();
    }
});

function showCookieBanner() {
    // Create cookie banner HTML
    const bannerHTML = `
        <div id="cookieBanner" class="cookie-banner">
            <div class="cookie-content">
                <div class="cookie-text">
                    <h4>🍪 We Use Cookies</h4>
                    <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to our use of cookies. <a href="privacy-policy.html" target="_blank">Learn more in our Privacy Policy</a>.</p>
                </div>
                <div class="cookie-buttons">
                    <button id="acceptAll" class="cookie-btn accept-btn">Accept All</button>
                    <button id="acceptEssential" class="cookie-btn essential-btn">Essential Only</button>
                    <button id="customizeCookies" class="cookie-btn customize-btn">Customize</button>
                </div>
            </div>
        </div>
    `;
    
    // Add banner to page
    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    
    // Add event listeners
    document.getElementById('acceptAll').addEventListener('click', function() {
        acceptAllCookies();
    });
    
    document.getElementById('acceptEssential').addEventListener('click', function() {
        acceptEssentialCookies();
    });
    
    document.getElementById('customizeCookies').addEventListener('click', function() {
        showCookieSettings();
    });
}

function acceptAllCookies() {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookiePreferences', JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    }));
    hideCookieBanner();
    enableAllCookies();
}

function acceptEssentialCookies() {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookiePreferences', JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
    }));
    hideCookieBanner();
    enableEssentialCookies();
}

function showCookieSettings() {
    // Create cookie settings modal
    const settingsHTML = `
        <div id="cookieSettings" class="cookie-settings-modal">
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h3>Cookie Preferences</h3>
                    <button id="closeSettings" class="close-settings">&times;</button>
                </div>
                <div class="cookie-settings-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Essential Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="essentialCookies" checked disabled>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Analytics Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analyticsCookies">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h4>Marketing Cookies</h4>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketingCookies">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <p>These cookies are used to track visitors across websites to display relevant and engaging advertisements.</p>
                    </div>
                </div>
                <div class="cookie-settings-footer">
                    <button id="savePreferences" class="cookie-btn save-btn">Save Preferences</button>
                    <button id="acceptAllSettings" class="cookie-btn accept-btn">Accept All</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', settingsHTML);
    
    // Add event listeners for settings
    document.getElementById('closeSettings').addEventListener('click', function() {
        hideCookieSettings();
    });
    
    document.getElementById('savePreferences').addEventListener('click', function() {
        saveCookiePreferences();
    });
    
    document.getElementById('acceptAllSettings').addEventListener('click', function() {
        acceptAllCookies();
        hideCookieSettings();
    });
}

function saveCookiePreferences() {
    const essential = document.getElementById('essentialCookies').checked;
    const analytics = document.getElementById('analyticsCookies').checked;
    const marketing = document.getElementById('marketingCookies').checked;
    
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify({
        essential: essential,
        analytics: analytics,
        marketing: marketing,
        timestamp: new Date().toISOString()
    }));
    
    hideCookieBanner();
    hideCookieSettings();
    applyCookiePreferences();
}

function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.remove();
    }
}

function hideCookieSettings() {
    const settings = document.getElementById('cookieSettings');
    if (settings) {
        settings.remove();
    }
}

function enableAllCookies() {
    // Enable Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
    }
    
    // Enable other tracking cookies
    console.log('All cookies enabled');
}

function enableEssentialCookies() {
    // Only enable essential cookies
    console.log('Only essential cookies enabled');
}

function applyCookiePreferences() {
    const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
    
    if (preferences.analytics) {
        // Enable analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
    
    if (preferences.marketing) {
        // Enable marketing cookies
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted'
            });
        }
    }
}

// Function to check cookie consent status
function getCookieConsent() {
    return localStorage.getItem('cookieConsent');
}

// Function to get cookie preferences
function getCookiePreferences() {
    return JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
}
