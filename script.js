// Search functionality
document.querySelector('.search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.reference-card');
    
    cards.forEach(card => {
        const cardNumber = card.querySelector('.card-number').textContent;
        if (cardNumber.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Reference card click handler
document.querySelectorAll('.reference-card').forEach(card => {
    card.addEventListener('click', function() {
        const referenceNumber = this.querySelector('.card-number').textContent;
        console.log(`تم فتح المرجع: ${referenceNumber}`);
        // يمكن إضافة منطق للانتقال إلى صفحة التفاصيل
    });
});

// Admin button click handler
document.querySelector('.admin-button').addEventListener('click', function() {
    console.log('فتح لوحة التحكم');
    // يمكن إضافة منطق لفتح لوحة التحكم أو إعادة توجيه
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Log page load
console.log('تم تحميل صفحة AMM Reference بنجاح');
