import mongo

const invoiceSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  feeTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeeType' },
  month: { type: String, required: true }, 
  amount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['unpaid', 'partially-paid', 'paid'], 
    default: 'unpaid' 
  },
  dueDate: Date,
  transactionId: String
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);