// هذا الكود يشغل الزر
document.getElementById('backButton').addEventListener('click', function() {
    // نجلب اسم الكورس من التخزين المحلي
    const courseName = localStorage.getItem('course');

    if (courseName === 'python') {
        window.location.href = 'python.html'; // صفحة كورس البايثون
    } else if (courseName === 'scratch') {
        window.location.href = 'scratch.html'; // صفحة كورس السكراتش
    } else if (courseName === 'web') {
        window.location.href = 'web_course.html'; // صفحة كورس الويب
    } else {
        // لو ما كان مخزن أي شيء
        alert('No course found.');
    }
   
});

// لما يشترك المستخدم في كورس البايثون
localStorage.setItem('course', 'python');

// أو لو اشترك في كورس السكراتش
localStorage.setItem('course', 'scratch');

// أو كورس الويب
