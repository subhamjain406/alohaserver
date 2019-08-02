var mongoose = require('mongoose');

var FranchiseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    franchise_type: {
        type: String,
        required: true,
        enum: ['state', 'district', 'unit']
    },
    franchise_state: {
        type: String,
    },
    franchise_district: {
        type: String,
    },
    franchise_area: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: String,
        required: true,
        index: { unique: true },
    },
    whatsapp_no: {
        type: String
    },
    email_id: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    present_occupation: {
        type: String,
    },
    business_type: {
        type: String,
        required: true,
    },
    capital: {
        type: String,
    },
    qualification: {
        type: String,
    },
    start_timeframe: {
        type: String,
    },
    programs_interested: {
        type: Array,
    },
    working_hours: {
        type: String,
    },
    reference_source: {
        type: String,
    },
    referral: {
        type: String,
    },
    status: {
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
    address_proof: {
        type: Array,
    },
    id_proof: {
        type: Array,
    },
    gst_certificate: {
        type: Array,
    },
    pan_card: {
        type: Array,
    },
    registration_certificate: {
        type: Array,
    },
    partnership_deed: {
        type: Array,
    },
    photo: {
        type: Array,
    },
    follow_up: {
        type: Array
    },
    enquiry_by: {
        type: String
    },
    enquiry_datetime: {
        type: Date,
        default: new Date()
    },
    gstin_no: {
        type: String,
    },
    royalty_percentage: {
        type: String,
    },
    bank_account_number: {
        type: String,
    },
    bank_account_name: {
        type: String,
    },
    bank_ifsc_code: {
        type: String,
    }

}, {
        timestamps: true
    });

module.exports = mongoose.model('Franchise', FranchiseSchema);