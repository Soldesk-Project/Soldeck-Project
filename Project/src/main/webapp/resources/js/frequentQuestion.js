document.addEventListener('DOMContentLoaded', function() {
    const faqTitles = document.querySelectorAll('.faq-title');

    faqTitles.forEach(title => {
        title.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            }
        });
    });
});