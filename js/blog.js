// Blog Post JavaScript Functions

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent('Check out this helpful ABA article: ');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
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