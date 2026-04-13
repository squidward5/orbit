const searchBar = document.getElementById("searchbar2");
const searchInput = document.getElementById("search");

if (searchBar) {
    searchBar.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = searchBar.value.trim();
            if (!query) return;

            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });
}

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (query && searchInput) {
    searchInput.value = query;
}
