const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true 
  },
  cardNumber: {
    type: String,
    required: true,
    // لا تخزن الرقم الكامل في الواقع الفعلي
    set: value => value.replace(/\s/g, '').slice(-4) // تخزين آخر 4 أرقام فقط
  },
  cardName: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2}\/\d{4}$/.test(v);
      },
      message: props => `${props.value} ليس تاريخ انتهاء صحيح (استخدم MM/YYYY)`
    }
  },
  cvv: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{3,4}$/.test(v);
      },
      message: props => `${props.value} ليس رمز CVV صحيح`
    }
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'JOD'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  gatewayResponse: { type: Object } // استجابة بوابة الدفع
}, { timestamps: true });

// Middleware لمنع تخزين البيانات الحساسة كاملة
paymentSchema.pre('save', function(next) {
  if (this.isModified('cvv')) {
    this.cvv = '***'; // لا تخزن CVV فعلياً
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
