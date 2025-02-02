// Get the nonce from the page head
const nonce = document.querySelector('meta[http-equiv="Content-Security-Policy"]').getAttribute('content').match(/'nonce-([^']+)'/)[1];
const baseurl = document.querySelector('meta[name="site-baseurl"]').getAttribute('href');

// If an element with id="site_search" is present. This assumes that the element with site_search is the search bar itself.
// Used on the ATP website, will be used on VI, VI Docs in the future as a replacement for the older Searchlight system.
if (document.getElementById('site_search')) {
    let searchIndex = [];
    let currentQuery = "";
    // the snippetRange, or how many characters to the left, and to the right (separate)
    // of the query should the snippet build and display on the search page
    let snippetRange = 150;
    let enableSnippets = true;
    let currentSortOption = 'unsorted';

    let activeFilters = {
        posts: true,
        notes: true,
        videos: true,
        pages: true
    };

    // Building the search index by fetching the sitemap and reading custom Vedalia namespace tags
    async function buildSearchIndex() {
        const sitemapXml = await fetchSitemap();
        if (!sitemapXml) {
            console.error("Failed to build search index.");
            // If we can't fetch the sitemap, we can't build the index to then search, sort and filter through.
            return;
        }
    
        const urls = sitemapXml.getElementsByTagName('url');
        // Builds the index, reads Vedalia tags
        searchIndex = Array.from(urls).map((url) => {
            const categories = Array.from(url.getElementsByTagName('vedalia:category')).map((cat) => cat.textContent.trim());
            const tags = Array.from(url.getElementsByTagName('vedalia:tag')).map((tag) => tag.textContent.trim());
            return {
                loc: url.getElementsByTagName('loc')[0]?.textContent || "",
                layout: url.getElementsByTagName('vedalia:layout')[0]?.textContent || "",
                type: url.getElementsByTagName('vedalia:type')[0]?.textContent || "",
                lang: url.getElementsByTagName('vedalia:lang')[0]?.textContent || "",
                locale: url.getElementsByTagName('vedalia:locale')[0]?.textContent || "",
                title: url.getElementsByTagName('vedalia:title')[0]?.textContent || "Untitled",
                description: url.getElementsByTagName('vedalia:description')[0]?.textContent || "",
                date: url.getElementsByTagName('vedalia:date')[0]?.textContent || "No date specified",
                thumbnail: url.getElementsByTagName('vedalia:thumbnail_url')[0]?.textContent || "/images/post-thumbnails/Missing.webp",
                thumbnailAlt: url.getElementsByTagName('vedalia:thumbnail_alt')[0]?.textContent || "",
                category: categories,
                tag: tags,
                indicatorType: url.getElementsByTagName('vedalia:indicator_type')[0]?.textContent || "",
                indicatorClass: url.getElementsByTagName('vedalia:indicator_class')[0]?.textContent || "",
                indicatorText: url.getElementsByTagName('vedalia:indicator_text')[0]?.textContent || "",
                indicatorTextExt: url.getElementsByTagName('vedalia:indicator_text_expanded')[0]?.textContent || "",
                content: url.getElementsByTagName('vedalia:content')[0]?.textContent || ""
            };
        });
    }

    // Gets the query parameters from the URL (https://alextecplayz.github.io/search?query=param)
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Asynchronous function to fetch the sitemap.
    async function fetchSitemap() {
        try {
            const response = await fetch('/sitemap.xml');
            if (!response.ok) {throw new Error('Failed to fetch sitemap.xml');}
            const sitemapText = await response.text();
            const parser = new DOMParser();
            const sitemapXml = parser.parseFromString(sitemapText, "application/xml");
            return sitemapXml;
        } catch (error) {
            console.error("Error fetching sitemap:", error);
            return null;
        }
    }

    function toggleSnippetVisibility() {
        const snippetElements = document.querySelectorAll('.searchresult-bottom');
        const displayValue = enableSnippets && currentQuery ? 'block' : 'none'; // if no query, hides snippets
        snippetElements.forEach((element) => {
            element.style.display = displayValue;
        });
    }

    // Used later on to strip the text used to search through the content (This is different from the actual snippet rendering, that uses the provided escaped HTML from <vedalia:content>)
    function normalizeText(text) {return text.replace(/\s+/g, " ").trim();}
    // We're adding the extracted nonce, because it's used to be able to use CSS without some errors because my CSP policy is rather strict, and I'd like to keep it that way.
    function stripHtmlTags(html) {
        const tempDiv = document.createElement('div');
        let htmlWithNonce = html.replace(/<style([^>]*)>/g, `<style nonce="${nonce}"$1>`);
        tempDiv.innerHTML = htmlWithNonce;
        return extractTextContent(tempDiv);
    }

    function extractTextContent(node) {
        if (!node) return "";
        if (node.nodeType === Node.TEXT_NODE) {
            return node.nodeValue;
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
            return Array.from(node.childNodes)
                .map(extractTextContent)
                .join(" ");
        }
        return "";
    }

    // Used to find the query in the snippet, and then to render the characters before and after the query in the snippet
    function findHtmlSnippet(content, query, start, end) {
        let plainTextIndex = 0;
        let htmlIndex = 0;
        while (plainTextIndex < start && htmlIndex < content.length) {
            if (content[htmlIndex] === '<') {
                while (htmlIndex < content.length && content[htmlIndex] !== '>') {
                    htmlIndex++;
                }
                htmlIndex++;
            } else {
                plainTextIndex++;
                htmlIndex++;
            }
        }

        const snippetStart = htmlIndex;
        while (plainTextIndex < end && htmlIndex < content.length) {
            if (content[htmlIndex] === '<') {
                while (htmlIndex < content.length && content[htmlIndex] !== '>') {
                    htmlIndex++;
                }
                htmlIndex++;
            } else {
                plainTextIndex++;
                htmlIndex++;
            }
        }
        const snippetEnd = htmlIndex;
        return content.substring(snippetStart, snippetEnd);
    }

    function sortSearchIndex(index) {
        if (currentSortOption === 'atoz') {
            return index.sort((a, b) => a.title.localeCompare(b.title));
        } else if (currentSortOption === 'ztoa') {
            return index.sort((a, b) => b.title.localeCompare(a.title));
        } else if (currentSortOption === 'newfirst') {
            return index.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (currentSortOption === 'oldfirst') {
            return index.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        return index;
    }
    
    // The function to perform the search itself
    async function performSearch(query) {
        currentQuery = query.trim();
        const sitemapXml = await fetchSitemap();
        if (!sitemapXml) {
            document.getElementById('error-message').textContent = 'Error fetching the search index.';
            // If we can't fetch the sitemap, we can't perform the search, since there's no index to search, sort and filter through.
            return;
        }

        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = "";

        const urls = sitemapXml.getElementsByTagName('url');
        const queryLower = currentQuery.toLowerCase();

        let matchFound = false;

        let filteredIndex = searchIndex.filter((entry) => {
            const { loc, title, description, type } = entry;
            if (
                (type === "post" && !activeFilters.posts) ||
                (type === "note" && !activeFilters.notes) ||
                (type === "video" && !activeFilters.videos) ||
                (type === "page" && !activeFilters.pages)
            ) {
                return false;
            }
            return (
                loc.toLowerCase().includes(queryLower) ||
                title.toLowerCase().includes(queryLower) ||
                description.toLowerCase().includes(queryLower)
            );
        });

        filteredIndex = sortSearchIndex(filteredIndex);

        filteredIndex.forEach((entry) => {
            matchFound = true;
            // These are used in the innerHTML, based on the index entry (e.g. for each post and page, there's an entry that contains one of each of these).
            const { loc, title, description, date, type, thumbnail, thumbnailAlt, category, tag, indicatorType, indicatorClass, indicatorText, indicatorTextExt, content } = entry;
    
            let snippet = "";
            if (enableSnippets && content && currentQuery && type !== "note" && type !== "video") {
                // The snippet character length purposefully ignores HTML tags, otherwise snippets would be much shorter and not visually match the difference between lengths.
                // By that, I mean that without stripping the HTML tags, the 'visible' difference between snippetRange value of 15 characters and 20 characters is wildly variable
                // depending on the amount of HTML tags that the snippet looks through.
                // This way, the difference 'visually' makes sense. 14 vs 15 characters takes one visible character away, which is how it should perform.
                const strippedContent = normalizeText(stripHtmlTags(content));
                const index = strippedContent.toLowerCase().indexOf(queryLower);
                if (index !== -1) {
                    const start = Math.max(0, index - snippetRange);
                    const end = Math.min(strippedContent.length, index + queryLower.length + snippetRange);
                    snippet = findHtmlSnippet(content, queryLower, start, end);
                    snippet = snippet.replace(new RegExp(`(${query})`, "gi"), `<span class="highlight">$1</span>`);
                } else {
                    snippet = "No snippet available. Query term not found in content.";
                }
            } else if (!enableSnippets) {
            } else {
                snippet = "No snippet available.";
            }

            const renderCategories = (categories) => categories.map((cat) => `<a class="article-category grotesk medium rem1" href="${baseurl}/categories/${cat}">${cat}</a>`).join('');
            const renderTags = (tags) => tags.map((tag) => `<a class="article-tag grotesk medium rem1" href="${baseurl}/tags/${tag}">${tag}</a>`).join('');
            const categoriesHtml = renderCategories(category);
            const tagsHtml = renderTags(tag);
    
            const resultItem = document.createElement('div');
            resultItem.className = 'searchresult';
            resultItem.innerHTML = `
                <div class="article">
                    <div class="searchresult-left article-left"><img class="article-image-size searchresult-thumbnail" src="${thumbnail}" alt="${thumbnailAlt}" title="${thumbnailAlt}"></div>
                    <div class="searchresult-right article-right">
                        <a href="${loc}"><p class="article-title searchresult-title rem2 white grotesk semibold">${title}</p></a>
                        <p class="article-desc searchresult-desc rem1 lightgray semibold monospace italic">${description}</p>
                        <p class="article-date searchresult-date rem1 lightgray grotesk bold">${date}</p>
                        <p class="${indicatorType} ${indicatorClass} vantagray monospace semibold rem1">${indicatorText} | ${indicatorTextExt}</p>
                        <div class="article-button-container">
                            <a class="article-button-light grotesk medium" href="${loc}">Read More <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="arrow-right" class="lucide lucide-arrow-right"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a>
                            <a class="article-button-light grotesk medium" data-share-url="${loc}" data-share-title="${title}" data-share-description="${description}" data-share-date="${date}" data-share-thumbnail="${thumbnail}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="share" class="lucide lucide-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line></svg> Share</a>
                        </div>
                        <div class="article-categories">
                            ${categoriesHtml}
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
                <div class="searchresult-bottom">
                    <div class="searchresult-excerpt"><p class="semibold grotesk rem1-15 accent-color">Excerpt from the first result found on the page:</p></div>
                    <pre class="post-content">${snippet}</pre>
                </div>
            `;
            resultsContainer.appendChild(resultItem);
        });
    
        if (!matchFound) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'flex row align-center';

            const messageParagraph = document.createElement('p');
            messageParagraph.className = 'grotesk medium white rem1-15';
            messageParagraph.textContent = `No results found for "${query}". Try again or `;
                    
            const homeLink = document.createElement('a');
            homeLink.className = 'accent-color link rem1-15 medium';
            homeLink.href = 'https://alextecplayz.github.io';
            homeLink.textContent = 'Return home';
                    
            messageParagraph.appendChild(homeLink);
            noResultsMessage.appendChild(messageParagraph);
            resultsContainer.appendChild(noResultsMessage);
        }

        toggleSnippetVisibility();
        refreshShareItems();
    }

    async function handleSearch() {
        const query = getQueryParameter('query');
        if (query) {
            currentQuery = query;
            document.getElementById('search-box').value = query;
            await buildSearchIndex();  
            performSearch(query);
        }
    }

    document.addEventListener("DOMContentLoaded", buildSearchIndex);

    document.getElementById('site_search').addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.getElementById('search-box').value.trim();
        
        if (query) {
            window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
        }
    });

    if (window.location.pathname.includes('/search')) {handleSearch();}

    if (document.getElementById('search-actions-trigger')) {
        const searchSettingsButton = document.getElementById('search-actions-trigger');
        const searchSettingsWindow = document.getElementById('search-actions-window');
        const searchSettingsWindowClose = document.getElementById('search-actions-close-button');

        function showSearchSettingsWindow() {searchSettingsWindow.style.display = 'flex';}
        function hideSearchSettingsWindow() {searchSettingsWindow.style.display = 'none';}
        searchSettingsButton.addEventListener('click', showSearchSettingsWindow);
        searchSettingsWindowClose.addEventListener('click', hideSearchSettingsWindow);

        document.getElementById('search-filteroutposts').addEventListener('change', (event) => {
            activeFilters.posts = !event.target.checked;
            performSearch(currentQuery);
        });
        document.getElementById('search-filteroutnotes').addEventListener('change', (event) => {
            activeFilters.notes = !event.target.checked;
            performSearch(currentQuery);
        });
        document.getElementById('search-filteroutvideos').addEventListener('change', (event) => {
            activeFilters.videos = !event.target.checked;
            performSearch(currentQuery);
        });
        document.getElementById('search-filteroutpages').addEventListener('change', (event) => {
            activeFilters.pages = !event.target.checked;
            performSearch(currentQuery);
        });
        document.getElementById('search-togglesnippets').addEventListener('change', (event) => {
            enableSnippets = event.target.checked;
            toggleSnippetVisibility();
            performSearch(currentQuery);
        });
        document.getElementById('search-snippetrange').addEventListener('input', (event) => {
            snippetRange = parseInt(event.target.value, 10);
            performSearch(currentQuery);
        });
        document.getElementById('search-resetsnippetrange').addEventListener('click', () => {
            snippetRange = 150;
            document.getElementById('search-snippetrange').value = snippetRange;
            performSearch(currentQuery);
        });
        document.getElementById('search-nosorting').addEventListener('change', () => {
            currentSortOption = 'unsorted';
            performSearch(currentQuery);
        });
        document.getElementById('search-sortatoz').addEventListener('change', () => {
            currentSortOption = 'atoz';
            performSearch(currentQuery);
        });
        document.getElementById('search-sortztoa').addEventListener('change', () => {
            currentSortOption = 'ztoa';
            performSearch(currentQuery);
        });
        document.getElementById('search-sortnewfirst').addEventListener('change', () => {
            currentSortOption = 'newfirst';
            performSearch(currentQuery);
        });
        document.getElementById('search-sortoldfirst').addEventListener('change', () => {
            currentSortOption = 'oldfirst';
            performSearch(currentQuery);
        });
    }
}