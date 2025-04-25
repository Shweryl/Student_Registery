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
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const filter = {
            $or: [
              { studentName: { $regex: search, $options: 'i' } },
              { 'selectedCourses.courseName' : { $regex: search, $options: 'i' } }
            ]
          };
        const students = await Invoice.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Invoice.countDocuments(filter);
        res.status(201).json({
            status: "success",
            students: students,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalStudents: total
        });
    } catch (error) {
        console.log(error);
    }
};
