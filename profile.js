document.addEventListener('DOMContentLoaded', function() {
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const photoInput = document.getElementById('photoInput');
    const profileImage = document.getElementById('profileImage');
    const messageBtn = document.getElementById('messageBtn');
    const messagePremiumModal = document.getElementById('messagePremiumModal');
    const closeMessageModal = document.getElementById('closeMessageModal');

    if (changePhotoBtn && photoInput && profileImage) {
        changePhotoBtn.addEventListener('click', function() {
            photoInput.click();
        });
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    profileImage.src = evt.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (messageBtn && messagePremiumModal && closeMessageModal) {
        messageBtn.addEventListener('click', function() {
            messagePremiumModal.classList.add('active');
        });
        closeMessageModal.addEventListener('click', function() {
            messagePremiumModal.classList.remove('active');
        });
        messagePremiumModal.addEventListener('click', function(e) {
            if (e.target === messagePremiumModal) {
                messagePremiumModal.classList.remove('active');
            }
        });
    }
}); 