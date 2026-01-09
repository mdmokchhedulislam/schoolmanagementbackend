
import Invoice from '../models/Invoice.js';
import Student from '../models/Student.js';

export const generateMonthlyInvoices = async (req, res) => {
  try {
    const { className, month, feeAmount, feeTypeId, dueDate } = req.body;
    const schoolId = req.user.schoolId;

    const students = await Student.find({ 
      schoolId, 
      studentClass: className, 
      status: 'active' 
    });

    const invoices = students.map(student => ({
      schoolId,
      studentId: student._id,
      feeTypeId,
      month,
      amount: feeAmount,
      dueDate: new Date(dueDate)
    }));

    await Invoice.insertMany(invoices);

    res.status(201).json({ success: true, message: `${invoices.length} Invoices generated!` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const collectFee = async (req, res) => {
  try {
    const { invoiceId, paidAmount, transactionId } = req.body;
    
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.paidAmount += paidAmount;
    invoice.transactionId = transactionId;
    
    if (invoice.paidAmount >= invoice.amount) {
      invoice.status = 'paid';
    } else {
      invoice.status = 'partially-paid';
    }

    await invoice.save();
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
