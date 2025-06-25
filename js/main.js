// Main JavaScript file for Parent Powered ABA

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded. Current page:', window.location.pathname);

    // Simplified directory context - now all pages are at root level with clean URLs
    function getDirectoryContext() {
        const path = window.location.pathname;
        
        // Clean URL structure - all pages are served from root
        if (path.startsWith('/blog/') && path !== '/blog') {
            return { 
                context: 'blog-post', 
                basePath: '/',
                isInSubDirectory: false 
            };
        } else if (path === '/blog') {
            return { 
                context: 'blog', 
                basePath: '/',
                isInSubDirectory: false 
            };
        } else {
            return { 
                context: 'root', 
                basePath: '/',
                isInSubDirectory: false 
            };
        }
    }

    const directoryInfo = getDirectoryContext();
    console.log('Directory context:', directoryInfo);

    // Load header component
    const headerElement = document.querySelector('header');
    if (headerElement) {
        const headerPath = '/components/header.html';
        console.log('Header loading: path =', headerPath);
        
        fetch(headerPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${headerPath}`);
                return response.text();
            })
            .then(data => {
                headerElement.innerHTML = data;
                console.log('Header HTML loaded.');
                
                // Since components should now use absolute paths, minimal path fixing needed
                console.log('Header uses absolute paths, minimal path fixing required.');
                
                initializeNavigation(); // Call after header is loaded
            })
            .catch(error => console.warn('Could not load header:', error));
    } else {
        console.warn('Header element not found in DOM.');
    }
    
    // Load newsletter component
    const newsletterElement = document.querySelector('.newsletter-component');
    if (newsletterElement) {
        const newsletterPath = '/components/newsletter.html';
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
        const footerPath = '/components/footer.html';
        
        fetch(footerPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${footerPath}`);
                return response.text();
            })
            .then(data => {
                footerElement.innerHTML = data;
                console.log('Footer HTML loaded.');
                // Footer should use absolute paths, no path fixing needed
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
        
        // Add active class to current navigation item based on clean URLs
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active'); 
            
            const linkHref = link.getAttribute('href');
            
            // Skip external links, anchors, and special links
            if (!linkHref || 
                linkHref.startsWith('#') || 
                linkHref.startsWith('http') || 
                linkHref.startsWith('mailto:') || 
                linkHref.startsWith('tel:')) {
                return;
            }
            
            // Check for home page
            if (currentPath === '/' || currentPath === '/index.html') {
                if (linkHref === '/' || linkHref === '/index.html') {
                    link.classList.add('active');
                }
                return;
            }
            
            // Check for blog main page
            if (currentPath === '/blog') {
                if (linkHref === '/blog') {
                    link.classList.add('active');
                }
                return;
            }
            
            // Check for blog posts
            if (currentPath.startsWith('/blog/') && currentPath !== '/blog') {
                if (linkHref === '/blog') {
                    link.classList.add('active');
                }
                return;
            }
            
            // Check for other pages with clean URLs
            if (currentPath === linkHref) {
                link.classList.add('active');
            }
        });
        
        console.log('Active link highlighting based on clean URLs complete.');
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
    
    // Initialize service card click functionality
    function initializeServiceCards() {
        console.log('Initializing service card click functionality...');

        // Check if already initialized to prevent double-binding
        if (document.body.hasAttribute('data-service-cards-initialized')) {
            console.log('Service cards already initialized, skipping...');
            return;
        }

        // Updated service card links to use clean URLs
        const serviceCardLinks = {
            'Complete ABA Parenting Course Access': '/course',
            'ABA Based Product Line': 'https://www.etsy.com/shop/ParentPoweredABA',
            'Personalized ABA Consultations': '/services#consultation',
            'Our Youtube Channel': 'https://youtube.com/@parentpoweredaba',
            'ABA Blog & Resources': '/blog',
            'Monthly Support Meetings': '/services#support-meetings'
        };

        // Get all service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            // Skip if this card is already initialized
            if (card.hasAttribute('data-click-initialized')) {
                console.log('Card already initialized, skipping...');
                return;
            }

            const heading = card.querySelector('h3');
            if (heading) {
                const headingText = heading.textContent.trim();
                let targetLink = serviceCardLinks[headingText];
                
                // Also check data-target attribute as fallback
                if (!targetLink) {
                    targetLink = card.getAttribute('data-target');
                }
                
                if (targetLink) {
                    // Make the card clickable
                    card.style.cursor = 'pointer';
                    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                
                    // Add hover effects
                    card.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-5px)';
                        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    });
                
                    card.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = '';
                    });
                
                    // Add click functionality with throttling
                    let isProcessing = false;
                    
                    card.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Prevent rapid clicks
                        if (isProcessing) {
                            console.log('Click already processing, ignoring...');
                            return;
                        }
                        
                        isProcessing = true;
                        
                        // Reset the flag after a short delay
                        setTimeout(() => {
                            isProcessing = false;
                        }, 1000);
                    
                        // Check if this is marked as external or starts with http
                        const isExternalLink = this.getAttribute('data-external') === 'true' || targetLink.startsWith('http');
                    
                        if (isExternalLink) {
                            console.log('Opening external link:', targetLink);
                            // Open external links in new tab
                            window.open(targetLink, '_blank', 'noopener,noreferrer');
                        } else {
                            console.log('Navigating to internal clean URL:', targetLink);
                            // Navigate to clean URL
                            window.location.href = targetLink;
                        }
                    });

                    // Add accessibility attributes
                    if (!card.getAttribute('role')) {
                        card.setAttribute('role', 'button');
                    }
                    if (!card.getAttribute('tabindex')) {
                        card.setAttribute('tabindex', '0');
                    }
                    if (!card.getAttribute('aria-label')) {
                        const isExternal = card.getAttribute('data-external') === 'true' || targetLink.startsWith('http');
                        const labelSuffix = isExternal ? ' (opens in new tab)' : '';
                        card.setAttribute('aria-label', `Navigate to ${headingText}${labelSuffix}`);
                    }
                
                    // Add keyboard navigation support
                    card.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.click();
                        }
                    });

                    // Mark this card as initialized
                    card.setAttribute('data-click-initialized', 'true');
                    console.log(`Service card "${headingText}" made clickable with clean URL: ${targetLink}`);
                }
            }
        });
        
        // Mark service cards as initialized
        document.body.setAttribute('data-service-cards-initialized', 'true');
        console.log('Service card initialization complete.');
    }

    // Call initialization functions
    initializeServiceCards();
});