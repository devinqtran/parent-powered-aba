// Blog Post JavaScript Functions

// Social Sharing Functions for Blog Posts

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    openShareWindow(shareUrl);
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(document.querySelector('meta[name="description"]').content);
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=ParentPoweredABA`;
    openShareWindow(shareUrl);
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(document.querySelector('meta[name="description"]').content);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    openShareWindow(shareUrl);
}

function openShareWindow(url) {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
        url,
        'shareWindow',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
    );
}

// Copy link to clipboard function (optional enhancement)
function copyLinkToClipboard() {
    const url = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyNotification();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyNotification();
        } catch (err) {
            console.error('Failed to copy link');
        }
        document.body.removeChild(textArea);
    }
}

function showCopyNotification() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'Link copied to clipboard!';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color, #4a90e2);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Reading progress indicator (optional)
window.addEventListener('scroll', function() {
    const article = document.querySelector('.blog-content');
    if (!article) return;
    
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    const progress = Math.min(100, Math.max(0, 
        ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
    ));
    
    // You can use this progress value to show a reading progress bar
    // Example: document.querySelector('.progress-bar').style.width = progress + '%';
});

// Smooth scrolling for internal links (optional)
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Print function (optional)
function printArticle() {
    window.print();
}

// Copy URL to clipboard function (optional)
function copyUrlToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(function() {
        alert('URL copied to clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}