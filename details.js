// الحصول على رقم المرجع من URL
function getReferenceNumber() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '787';
}

// تحديث رقم المرجع في الرأس
document.addEventListener('DOMContentLoaded', function() {
    const refNumber = getReferenceNumber();
    document.getElementById('referenceNumber').textContent = refNumber;
    loadReferences(refNumber);
});

// تحميل المراجع من الملف
function loadReferences(refNumber) {
    // محاكاة جلب البيانات من ملف JSON
    fetch(`references-${refNumber}.json`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return [];
        })
        .catch(() => {
            // إذا لم يكن الملف موجوداً، استخدم مصفوفة فارغة
            return [];
        })
        .then(data => {
            displayReferences(data);
        });
}

// عرض المراجع
function displayReferences(references) {
    const list = document.getElementById('referencesList');
    
    if (!references || references.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📁</div>
                <p class="empty-title">لا توجد مراجع حتى الآن</p>
                <p class="empty-subtitle">اضغط + لإضافة أول مرجع</p>
                <button class="add-reference-btn" onclick="openAddModal()">+ إضافة مرجع</button>
            </div>
        `;
        return;
    }

    list.innerHTML = references.map((ref, index) => `
        <div class="reference-item">
            <div class="reference-item-header">
                <div class="reference-item-title">${ref.name}</div>
                <div class="reference-item-actions">
                    <button class="delete-btn" onclick="deleteReference(${index})" title="حذف">🗑️</button>
                </div>
            </div>
            <div class="reference-item-details">
                <div class="detail-field">
                    <span class="detail-label">الوصف</span>
                    <span class="detail-value">${ref.description}</span>
                </div>
                <div class="detail-field">
                    <span class="detail-label">AMM</span>
                    <span class="detail-value">${ref.amm}</span>
                </div>
                <div class="detail-field">
                    <span class="detail-label">P/N</span>
                    <span class="detail-value">${ref.pn}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// فتح نموذج الإضافة
function openAddModal() {
    document.getElementById('addModal').classList.add('active');
}

// إغلاق نموذج الإضافة
function closeAddModal() {
    document.getElementById('addModal').classList.remove('active');
    document.getElementById('addReferenceForm').reset();
}

// حفظ المرجع الجديد
document.getElementById('addReferenceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const refNumber = getReferenceNumber();
    const newReference = {
        name: document.getElementById('refName').value,
        description: document.getElementById('refDescription').value,
        amm: document.getElementById('refAMM').value,
        pn: document.getElementById('refPN').value,
        timestamp: new Date().toISOString()
    };

    // جلب المراجع الموجودة
    fetch(`references-${refNumber}.json`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return [];
        })
        .catch(() => [])
        .then(references => {
            // إضافة المرجع الجديد
            references.push(newReference);
            
            // محاكاة حفظ البيانات
            console.log(`تم حفظ البيانات في references-${refNumber}.json:`, references);
            
            // إرسال البيانات إلى الخادم (يجب تطبيق هذا على الخادم الفعلي)
            saveReferencesToServer(refNumber, references);

            // تحديث العرض
            displayReferences(references);
            
            // إغلاق النموذج
            closeAddModal();
            
            // عرض رسالة نجاح
            showSuccessMessage('تم حفظ المرجع بنجاح!');
        });
});

// حفظ المراجع على الخادم
function saveReferencesToServer(refNumber, references) {
    // هذه الدالة يجب أن تكون على الخادم
    // يمكن استخدام fetch API لإرسال البيانات
    fetch('save-reference.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            referenceNumber: refNumber,
            references: references
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('تم حفظ البيانات على الخادم:', data);
    })
    .catch(error => {
        console.error('خطأ في حفظ البيانات:', error);
    });
}

// حذف مرجع
function deleteReference(index) {
    if (confirm('هل تريد حذف هذا المرجع؟')) {
        const refNumber = getReferenceNumber();
        
        fetch(`references-${refNumber}.json`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return [];
            })
            .catch(() => [])
            .then(references => {
                references.splice(index, 1);
                saveReferencesToServer(refNumber, references);
                displayReferences(references);
                showSuccessMessage('تم حذف المرجع بنجاح!');
            });
    }
}

// عرض رسالة نجاح
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        z-index: 2000;
        animation: slideDown 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// العودة للصفحة الرئيسية
function goBack() {
    window.history.back();
}

// إغلاق النموذج بالضغط على خارجه
document.getElementById('addModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAddModal();
    }
});
