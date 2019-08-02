var mongoose = require('mongoose');
 
var StudentSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
    },
    school_name: {
        type: String,
    },
    school_address: {
        type: String,
    },
    mobile_no: {
        type: String,
        required: true,
        index: { unique: true },
    },
    whatsapp_no: {
        type: String,
    },
    email_id: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    parent_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
    },
    area: {
        type: String,
    },
    program: {
        type: Array
    },
    contact_time: {
        type: String,
    },
    status: {
        type: String,
    },
    referral: {
        type: String,
    },
    remarks: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    photo: {
        type: String,
    },
    enquiry_by: {
        type: String
    },
    enquiry_datetime: {
        type: Date,
        default: new Date()
    },
    registration_fee: {
        type: Number,
        default: 0,
    },
    kit_fee: {
        type: Number,
        default: 0,
    },
    extra_fee: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    total_amount_paid: {
        type: Number,
        default: 0,
    },
    kit_number: {
        type: String,
    },
    course_instructor: {
        type: String,
    },
    level: {
        type: Number,
        required: true,
        default: 0,
    },
    promotions: {
        type: Array,
    },
    attendance: {
        type: Array,
    }

}, {
    timestamps: true
});
 
module.exports = mongoose.model('Student', StudentSchema);

/* promotion: {
    promotion_date, promotion_by, promotion_to, marks_scored, marks_sheet attachment, remarks,
    student_payment_amount, student_payment_date, student_payment_mode, , center_payment, 
} */

/* attendance: {level, attendance_datetime, attendance_by, attendance_location} */

/*  */