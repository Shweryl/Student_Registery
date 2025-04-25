const mongoose = require('mongoose');
const { isEmail } = require('validator');
 
const courseSchema = mongoose.Schema({
    courseName : String,
    batch : String,
    type : String,
    remark : String,
    fee : Number,
    discount : String,
    total : Number,
})

const invoiceSchema = mongoose.Schema({
    studentName : {
        type : String,
        required : [true, "Student name is required."],
    },
    studentEmail : {
        type : String,
        required : [true, "Student email is required."],
        validate : [isEmail, "Please enter a valid email."]
    },
    studentPhone : {
        type : Number,
        required : [true, 'Student phone is required.']
    },
    selectedCourses : {
        type : [courseSchema],
        validate: {
            validator: function (v) {
              return v && v.length > 0;
            },
            message: "At least one course must be selected."
        }
    },
    totalAmount : Number,
    paymentMethod : {
        type : String,
        required : [true, 'At least one payment must be selected.']
    },

},  { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;