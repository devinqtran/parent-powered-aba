// Main JavaScript file for Parent Powered ABA

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Current page:', window.location.pathname);

    // Load header component
    const headerElement = document.querySelector('header');
    if (headerElement) {
        const isInPagesDirectory = window.location.pathname.includes('/pages/');
        console.log('Header loading: isInPagesDirectory =', isInPagesDirectory);
        
        const headerPath = isInPagesDirectory 
            ? '../components/header.html' 
            : 'components/header.html';
        console.log('Header loading: path =', headerPath);
        
        fetch(headerPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${headerPath}`);
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;
                console.log('Header HTML loaded.');

                if (isInPagesDirectory) {
                    console.log('Fixing paths in HEADER because isInPagesDirectory is true.');
                    // Fix image paths
                    headerElement.querySelectorAll('img[src^="assets/"]').forEach(img => {
                        const currentSrc = img.getAttribute('src');
                        if (currentSrc && !currentSrc.startsWith('../')) {
                            img.src = '../' + currentSrc;
                        }
                    });
                    
                    // Fix <a> href paths
                    headerElement.querySelectorAll('a[href]').forEach(link => {
                        const originalHref = link.getAttribute('href');
                        console.log(`Header Link Processing: Original href = "${originalHref}"`);

                        // This first 'if' handles conditions where we DON'T want to modify the href
                        if (!originalHref || // No href attribute
                            originalHref.startsWith('#') || // Anchor link
                            originalHref.startsWith('http') || // Absolute URL
                            originalHref.startsWith('mailto:') || // Mailto link
                            originalHref.startsWith('tel:') || // Tel link
                            originalHref.startsWith('/') || // Root-relative link
                            originalHref.startsWith('../') // Already adjusted or explicitly relative
                        ) {
                            console.log(`  -> Skipping modification for: "${originalHref}" (special link or already relative)`);
                        } else {
                            // At this point, originalHref is a simple relative path like "index.html" or "pages/about.html"
                            console.log(`  -> Eligible for modification: "${originalHref}"`);
                            if (originalHref === 'index.html') {
                                link.setAttribute('href', '../' + originalHref);
                                console.log(`    -> Rule (index.html): New href = "${link.getAttribute('href')}"`);
                            } else if (originalHref.startsWith('pages/')) {
                                // This is the key for subpage to subpage links when on a subpage
                                link.setAttribute('href', originalHref.substring('pages/'.length));
                                console.log(`    -> Rule (pages/): New href = "${link.getAttribute('href')}"`);
                            } else {
                                // This case handles links like "contact.html" (no pages/ prefix)
                                // if they were in header.html like that. When on a subpage,
                                // this path is already correct relative to /pages/, so no change is needed.
                                console.log(`    -> Rule (other relative): No change needed for "${originalHref}", already relative to current /pages/ context.`);
                            }
                        }
                    });
                } else {
                    console.log('Not in pages directory, so no path fixing for header content.');
                }
                
                initializeNavigation(); // Call after paths are fixed
            })
            .catch(error => console.warn('Could not load header:', error));
    } else {
        console.warn('Header element not found in DOM.');
    }
    
    // Load newsletter component
    const newsletterElement = document.querySelector('.newsletter-component');
    if (newsletterElement) {
        const isInPagesDirectory = window.location.pathname.includes('/pages/');
        console.log('Newsletter loading: isInPagesDirectory =', isInPagesDirectory);
        
        const newsletterPath = isInPagesDirectory 
            ? '../components/newsletter.html' 
            : 'components/newsletter.html';
        console.log('Newsletter loading: path =', newsletterPath);
        
        fetch(newsletterPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${newsletterPath}`);
                return response.text();
            })
            .then(data => {
                newsletterElement.innerHTML = data;
                console.log('Newsletter HTML loaded.');
                
                // Newsletter component includes its own JavaScript initialization
                // The script tag in the component will auto-execute
            })
            .catch(error => console.warn('Could not load newsletter:', error));
    }
    
    // Load footer component
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        const isInPagesDirectoryFooter = window.location.pathname.includes('/pages/');
        const footerPath = isInPagesDirectoryFooter 
            ? '../components/footer.html' 
            : 'components/footer.html';
        
        fetch(footerPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${footerPath}`);
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
                if (isInPagesDirectoryFooter) {
                    footerElement.querySelectorAll('img[src^="assets/"]').forEach(img => {
                        const currentSrc = img.getAttribute('src');
                        if (currentSrc && !currentSrc.startsWith('../')) {
                            img.src = '../' + currentSrc;
                        }
                    });
                }
            })
            .catch(error => console.warn('Could not load footer:', error));
    }
    
    function initializeNavigation() {
        console.log('Initializing navigation (smooth scroll, active links)...');
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return; 
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 70; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
        
        // Add active class to current navigation item based on URL
        const currentUrl = new URL(window.location.href);
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active'); 
            let linkUrl;
            try {
                // link.href will be the fully resolved absolute URL
                linkUrl = new URL(link.href); 
            } catch (e) {
                // console.warn(`Skipping link with invalid href: ${link.getAttribute('href')}`);
                return; 
            }

            if (linkUrl.origin !== currentUrl.origin) {
                return; // Skip external links
            }
            
            // Normalize pathnames for comparison (ensure trailing slashes consistency, treat / and /index.html same)
            let currentPathNormalized = currentUrl.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
            if (currentPathNormalized === '') currentPathNormalized = '/'; // Root case

            let linkPathNormalized = linkUrl.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
            if (linkPathNormalized === '') linkPathNormalized = '/'; // Root case


            // More direct comparison:
            // Get the original 'href' attribute as written in the HTML (or as modified by JS)
            const rawLinkHref = link.getAttribute('href');

            // Check for home page
            if ((currentUrl.pathname === '/' || currentUrl.pathname === '/index.html')) {
                if (rawLinkHref === 'index.html' || rawLinkHref === '../index.html' || rawLinkHref === './index.html') {
                    link.classList.add('active');
                    return; // Found active link, exit for this link
                }
            }
            
            // Check for other pages
            // We need to compare the final part of the URL path
            const currentPageFileName = currentUrl.pathname.substring(currentUrl.pathname.lastIndexOf('/') + 1) || 'index.html';
            let linkTargetFileName = rawLinkHref.substring(rawLinkHref.lastIndexOf('/') + 1);
            
            // Handle cases where rawLinkHref might be like "about.html" or "../index.html"
            if (rawLinkHref.startsWith('../')) { // e.g., ../index.html
                linkTargetFileName = 'index.html'; // Assume it targets index if it goes up a level
            } else if (!rawLinkHref.includes('/')) { // e.g., "about.html"
                // linkTargetFileName is already correct
            }


            if (currentPageFileName === linkTargetFileName && currentPageFileName !== 'index.html') {
                 link.classList.add('active');
            } else if (currentPageFileName === 'index.html' && linkTargetFileName === 'index.html') {
                 // This was handled by the specific homepage check above, but as a fallback
                 if (rawLinkHref === 'index.html' || rawLinkHref === '../index.html' || rawLinkHref === './index.html') {
                    link.classList.add('active');
                 }
            }


        });
        console.log('Active link highlighting based on URL complete.');
        updateActiveNavLink(); // Call after general active links are set
    }
    
    // Fallback initialization if header wasn't dynamically loaded
    if (!headerElement || (headerElement.childNodes.length > 0 && headerElement.innerHTML.trim() !== '')) {
        // Check if header content exists but was not fetched (e.g. static include or fetch failed silently)
        // If headerElement is not null AND (it has children OR its trimmed innerHTML isn't empty)
        // This implies that initializeNavigation might not have run if the fetch promise chain was the only place it was called.
        // However, initializeNavigation IS called within the .then() of the fetch, so this might be redundant
        // unless the fetch itself fails very early or headerElement is null.
        // The primary purpose here is to ensure initializeNavigation runs if header is static.
        console.log('Header not loaded dynamically or already present, calling initializeNavigation if applicable.');
        if (document.querySelector('.nav-links a')) { // Check if nav links are actually present
             initializeNavigation();
        }
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        // Temporarily remove 'active' from page links if a section link will be activated
        // This is tricky logic, for now, let's allow both to be active if a section is scrolled to
        // Or, ensure that page links are NOT also hash links.

        document.querySelectorAll('.nav-links a[href^="#"]').forEach(sectionLink => {
            // Don't remove 'active' if it's also the main page link that's active.
            // This requires checking if the #link is part of a fully active page link.
            // For simplicity now, just remove from # links and re-add if active.
             sectionLink.classList.remove('active');
        });

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; 
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLinkForSection = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (navLinkForSection) {
                    navLinkForSection.classList.add('active');
                }
            } 
            // No 'else remove active' here, because the loop above clears all # links first.
            // And we don't want to deactivate the main page link.
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    // updateActiveNavLink(); // Call once on load - initializeNavigation calls it.
});