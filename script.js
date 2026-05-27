// البحث في البطاقات
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

// فتح صفحة التفاصيل
function openReference(refNumber) {
    window.location.href = `details.html?id=${refNumber}`;
}

// فتح لوحة التحكم
function openAdminPanel() {
    console.log('فتح لوحة التحكم');
    // يمكن إضافة منطق لفتح لوحة التحكم
    alert('Admin Panel - قيد التطوير');
}

// إضافة تأثير عند الضغط
document.querySelectorAll('.reference-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// تسجيل الصفحة
console.log('تم تحميل صفحة AMM Reference بنجاح');
