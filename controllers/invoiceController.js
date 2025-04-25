const Invoice = require("../model/invoice");

handleErrors = (err) => {
    console.log(err.message, err.code);
    const errors = {
        studentName: "",
        studentEmail: "",
        studentPhone: "",
        selectedCourses: "",
        totalAmount: "",
        paymentMethod: "",
    };
    if (err.message.includes("Invoice validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports.storeInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json({
            status: "success",
            invoice: invoice,
        });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({
            status: "fail",
            errors: errors,
        });
    }
};

module.exports.retrieveStudents = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 10; // Items per page
    const skip = (page - 1) * limit;
    try {
        const students = await Invoice.find().skip(skip).limit(limit);
        res.status(201).json({
            status: "success",
            students: students,
        });
    } catch (error) {
        console.log(error);
    }
};
