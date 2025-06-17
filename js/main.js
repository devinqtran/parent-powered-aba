// Main JavaScript file for Parent Powered ABA

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Current page:', window.location.pathname);

    // Determine the base path and directory context
    function getDirectoryContext() {
        const path = window.location.pathname;
        if (path.includes('/blog/posts/')) {
            return { 
                context: 'blog-post', 
                basePath: '../../../',
                isInSubDirectory: true 
            };
        } else if (path.includes('/blog/')) {
            return { 
                context: 'blog', 
                basePath: '../',
                isInSubDirectory: true 
            };
        } else if (path.includes('/pages/')) {
            return { 
                context: 'pages', 
                basePath: '../',
                isInSubDirectory: true 
            };
        } else {
            return { 
                context: 'root', 
                basePath: './',
                isInSubDirectory: false 
            };
        }
    }

    const directoryInfo = getDirectoryContext();
    console.log('Directory context:', directoryInfo);

    // Load header component
    const headerElement = document.querySelector('header');
    if (headerElement) {
        const headerPath = directoryInfo.isInSubDirectory 
            ? directoryInfo.basePath + 'components/header.html'
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

                if (directoryInfo.isInSubDirectory) {
                    console.log(`Fixing paths in HEADER for ${directoryInfo.context} context.`);
                    
                    // Fix image paths
                    headerElement.querySelectorAll('img[src^="assets/"]').forEach(img => {
                        const currentSrc = img.getAttribute('src');
                        if (currentSrc && !currentSrc.startsWith('../')) {
                            img.src = directoryInfo.basePath + currentSrc;
                        }
                    });
                    
                    // Fix <a> href paths
                    headerElement.querySelectorAll('a[href]').forEach(link => {
                        const originalHref = link.getAttribute('href');
                        console.log(`Header Link Processing: Original href = "${originalHref}"`);

                        // Skip modification for special links
                        if (!originalHref || 
                            originalHref.startsWith('#') || 
                            originalHref.startsWith('http') || 
                            originalHref.startsWith('mailto:') || 
                            originalHref.startsWith('tel:') || 
                            originalHref.startsWith('/') || 
                            originalHref.startsWith('../')
                        ) {
                            console.log(`  -> Skipping modification for: "${originalHref}" (special link or already relative)`);
                        } else {
                            console.log(`  -> Eligible for modification: "${originalHref}"`);
                            
                            if (originalHref === 'index.html') {
                                link.setAttribute('href', directoryInfo.basePath + originalHref);
                                console.log(`    -> Rule (index.html): New href = "${link.getAttribute('href')}"`);
                            } else if (originalHref.startsWith('pages/')) {
                                // Handle subpage to subpage navigation
                                if (directoryInfo.context === 'pages') {
                                    link.setAttribute('href', originalHref.substring('pages/'.length));
                                } else {
                                    // From blog to pages
                                    link.setAttribute('href', directoryInfo.basePath + originalHref);
                                }
                                console.log(`    -> Rule (pages/): New href = "${link.getAttribute('href')}"`);
                            } else if (originalHref.startsWith('blog/') || originalHref === 'blog.html') {
                                // Handle blog navigation
                                if (directoryInfo.context === 'blog' || directoryInfo.context === 'blog-post') {
                                    // Already in blog context
                                    if (originalHref === 'blog.html') {
                                        link.setAttribute('href', directoryInfo.context === 'blog-post' ? '../blog.html' : 'blog.html');
                                    } else {
                                        link.setAttribute('href', directoryInfo.basePath + originalHref);
                                    }
                                } else {
                                    // From other contexts to blog
                                    link.setAttribute('href', directoryInfo.basePath + originalHref);
                                }
                                console.log(`    -> Rule (blog): New href = "${link.getAttribute('href')}"`);
                            } else if (originalHref.startsWith('#')) {
                                // Handle anchor links - no modification needed
                                console.log(`    -> Rule (anchor): No change needed for "${originalHref}"`);
                            } else {
                                // Other relative links - typically these should get the base path prepended
                                if (directoryInfo.context === 'blog-post' && !originalHref.includes('.html')) {
                                    // Likely a relative page link, prepend base path
                                    link.setAttribute('href', directoryInfo.basePath + originalHref);
                                    console.log(`    -> Rule (other relative with base): New href = "${link.getAttribute('href')}"`);
                                } else {
                                    console.log(`    -> Rule (other relative): No change needed for "${originalHref}"`);
                                }
                            }
                        }
                    });
                } else {
                    console.log('In root directory, so no path fixing for header content.');
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
        const newsletterPath = directoryInfo.isInSubDirectory 
            ? directoryInfo.basePath + 'components/newsletter.html'
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
            })
            .catch(error => console.warn('Could not load newsletter:', error));
    }
    
    // Load footer component
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        const footerPath = directoryInfo.isInSubDirectory 
            ? directoryInfo.basePath + 'components/footer.html'
            : 'components/footer.html';
        
        fetch(footerPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${footerPath}`);
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
                if (directoryInfo.isInSubDirectory) {
                    footerElement.querySelectorAll('img[src^="assets/"]').forEach(img => {
                        const currentSrc = img.getAttribute('src');
                        if (currentSrc && !currentSrc.startsWith('../')) {
                            img.src = directoryInfo.basePath + currentSrc;
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
                linkUrl = new URL(link.href); 
            } catch (e) {
                return; 
            }

            if (linkUrl.origin !== currentUrl.origin) {
                return; // Skip external links
            }
            
            const rawLinkHref = link.getAttribute('href');

            // Check for home page
            if ((currentUrl.pathname === '/' || currentUrl.pathname === '/index.html')) {
                if (rawLinkHref === 'index.html' || rawLinkHref === '../index.html' || rawLinkHref === '../../../index.html' || rawLinkHref === './index.html') {
                    link.classList.add('active');
                    return;
                }
            }
            
            // Check for blog pages
            if (currentUrl.pathname.includes('/blog/')) {
                if (rawLinkHref === 'blog.html' || rawLinkHref === '../blog.html' || rawLinkHref === '../../../blog.html') {
                    link.classList.add('active');
                    return;
                }
            }
            
            // Check for other pages
            const currentPageFileName = currentUrl.pathname.substring(currentUrl.pathname.lastIndexOf('/') + 1) || 'index.html';
            let linkTargetFileName = rawLinkHref.substring(rawLinkHref.lastIndexOf('/') + 1);
            
            if (rawLinkHref.startsWith('../')) {
                if (rawLinkHref.includes('index.html')) {
                    linkTargetFileName = 'index.html';
                } else if (rawLinkHref.includes('blog.html')) {
                    linkTargetFileName = 'blog.html';
                }
            } else if (!rawLinkHref.includes('/')) {
                // linkTargetFileName is already correct
            }

            if (currentPageFileName === linkTargetFileName && currentPageFileName !== 'index.html') {
                link.classList.add('active');
            } else if (currentPageFileName === 'index.html' && linkTargetFileName === 'index.html') {
                if (rawLinkHref === 'index.html' || rawLinkHref === '../index.html' || rawLinkHref === '../../../index.html' || rawLinkHref === './index.html') {
                    link.classList.add('active');
                }
            }
        });
        
        console.log('Active link highlighting based on URL complete.');
        updateActiveNavLink();
    }
    
    // Fallback initialization if header wasn't dynamically loaded
    if (!headerElement || (headerElement.childNodes.length > 0 && headerElement.innerHTML.trim() !== '')) {
        console.log('Header not loaded dynamically or already present, calling initializeNavigation if applicable.');
        if (document.querySelector('.nav-links a')) {
             initializeNavigation();
        }
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(sectionLink => {
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
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
});