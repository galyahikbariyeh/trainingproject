const Payment = require('../models/payment');
const Course = require('../models/course');
const User = require('../models/User');

// عرض صفحة الدفع
exports.getPaymentPage = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).send('الكورس غير موجود');
    }

    res.render('payment', {
      course,
      price: course.price,
      currency: 'JOD',
      user: req.user
    });
  } catch (err) {
    res.status(500).send('حدث خطأ في تحميل صفحة الدفع');
  }
};

// معالجة عملية الدفع
exports.processPayment = async (req, res) => {
  try {
    const { cardNumber, cardName, expiry, cvv } = req.body;
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // التحقق من صحة البيانات
    if (!cardNumber || !cardName || !expiry || !cvv) {
      return res.status(400).render('payment', {
        error: 'جميع الحقول مطلوبة',
        course: await Course.findById(courseId)
      });
    }

    // إنشاء سجل الدفع (بدون معالجة فعلية للدفع)
    const course = await Course.findById(courseId);
    const payment = new Payment({
      user: userId,
      course: courseId,
      cardNumber,
      cardName,
      expiryDate: expiry,
      cvv,
      amount: course.price,
      currency: 'JOD'
    });

    await payment.save();

    // في الواقع الفعلي: هنا ستقوم بالاتصال ببوابة الدفع
    // هذه مجرد محاكاة للعملية
    const paymentSuccess = simulatePayment(cardNumber, expiry, cvv);

    if (paymentSuccess) {
      payment.status = 'completed';
      await payment.save();
      
      // إضافة الكورس للمستخدم
      await User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedCourses: courseId }
      });

      return res.redirect(`/courses/${courseId}?payment=success`);
    } else {
      payment.status = 'failed';
      await payment.save();
      return res.render('payment', {
        error: 'فشلت عملية الدفع، يرجى التحقق من بيانات البطاقة',
        course
      });
    }
  } catch (err) {
    res.status(500).render('payment', {
      error: 'حدث خطأ أثناء عملية الدفع',
      course: await Course.findById(req.params.courseId)
    });
  }
};

// محاكاة عملية الدفع (للتطوير فقط)
function simulatePayment(cardNumber, expiry, cvv) {
  // في الواقع الفعلي، استبدل هذا بالاتصال الفعلي ببوابة الدفع
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  
  // تحقق بسيط من رقم البطاقة
  if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
    return false;
  }
  
  // تحقق من تاريخ الانتهاء
  if (!/^\d{2}\/\d{4}$/.test(expiry)) {
    return false;
  }
  
  // تحقق من CVV
  if (!/^\d{3,4}$/.test(cvv)) {
    return false;
  }
  
  // محاكاة نجاح الدفع بنسبة 80% لأغراض التطوير
  return Math.random() < 0.8;
}