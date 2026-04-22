document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search") || document.getElementById("searchbar2");
    const searchFrame = document.getElementById("searchframe");

    // encoding
    const orbitEncode = (str) => btoa(encodeURIComponent(str));
    const orbitDecode = (str) => {
        try { return decodeURIComponent(atob(str)); } catch { return null; }
    };

    // main search
    const performSearch = (rawQuery, isInitialLoad = false) => {
        if (!rawQuery) return;

        let formattedQuery = rawQuery.trim();

        // detect domain-like inputs (for example: example.com)
        const looksLikeDomain = /^[^\s]+\.[^\s]+$/.test(formattedQuery);

        if (
            !formattedQuery.startsWith("http://") &&
            !formattedQuery.startsWith("https://") && looksLikeDomain
        ) {
            formattedQuery = "https://" + formattedQuery;
        }

        const isUrl = formattedQuery.startsWith("http://") || formattedQuery.startsWith("https://");
        const encryptedValue = orbitEncode(formattedQuery);
        const targetUrl = `search.htM?q=${encryptedValue}`;

        if (searchInput) {
            searchInput.value = formattedQuery;
        }

        if (searchFrame) {
            searchFrame.src = isUrl? formattedQuery: `https://www.bing.com/search?q=${encodeURIComponent(rawQuery)}`; // only search engine that works with iframes but ill find something else if theres something better
        }

        if (!isInitialLoad) {
            if (window.location.pathname.includes("search.htM")) {
                window.history.pushState({ q: encryptedValue }, "", targetUrl);
            } else {
                window.location.href = targetUrl;
            }
        }
    };

    // initial load
    const params = new URLSearchParams(window.location.search);
    const initialEncrypted = params.get("q");

    if (initialEncrypted) {
        const decrypted = orbitDecode(initialEncrypted);
        if (decrypted) {
            performSearch(decrypted, true);
        }
    }

    // input handler
    if (searchInput) {
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                performSearch(searchInput.value);
            }
        });
    }

    // history nav
    window.addEventListener("popstate", () => {
        const newParams = new URLSearchParams(window.location.search);
        const newEncrypted = newParams.get("q");

        if (newEncrypted) {
            const decoded = orbitDecode(newEncrypted);
            if (decoded) {
                performSearch(decoded, true);
            }
        }
    });

    // nav buttons
    document.getElementById("back")?.addEventListener("click", () => history.back());
    document.getElementById("forward")?.addEventListener("click", () => history.forward());
    document.getElementById("refresh")?.addEventListener("click", () => {
        if (searchFrame) searchFrame.src = searchFrame.src;
    });

    // sync url when iframe src changes
    if (searchFrame && searchInput) {
        searchFrame.onload = () => {
            try {
                const url = searchFrame.contentWindow.location.href;
                searchInput.value = url;
            } catch {
                console.log("external site loaded (cross-origin)");
            }
        };
    }
});