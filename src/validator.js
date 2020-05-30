export default class FormValidator {
    static classicError = {
        required: 'This field cannot be empty',
        length: 'Field must contains this number of characters:',
        cardExpDate: 'Date must be in format (MM/YY)',
        email: 'Incorrect email',
        int: 'This field can contains integer numbers only',
        price: 'Price must be in format X.XX',
        match: "Passwords doesn't match",
        minlen: 'Field must contains at least this number of characters:',
        maxlen: 'Field must contains not more than this number of characters:',
        min: 'Number is too small. Minimum:',
        max: 'Number is too big. Maximum:',
    }
    
    static setOptions(options) {
        this.fields = options.fields || {};
        this.errors = options.errors || {};
        return this.validate;
    }

    static validateField(name) {
        const target = document.querySelector(`[name="${name}"]`);
        if (!target) return;
        const value = target.value;
        const field = this.fields[name.toString()];
        if (field.required) {
            if (!value) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].required : null;
                return error || this.classicError.required;
            }
        }
        if (field.minlen) {
            if (value.length < field.minlen) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].minlen : null;
                return error || `${this.classicError.minlen} ${field.minlen}`;
            }
        }
        if (field.maxlen) {
            if (value.length > field.maxlen) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].maxlen : null;
                return error || `${this.classicError.maxlen} ${field.maxlen}`;
            }
        }
        if (field.length) {
            if (value.length !== field.length) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].length : null;
                return error || `${this.classicError.length} ${field.length}`;
            }
        }
        if (field.email) {
            if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].email : null;
                return error || this.classicError.email;
            }
        }
        if (field.cardExpDate) {
            if (!value.match(/^\d{2}\/\d{2}$/)) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].cardExpDate : null;
                return error || this.classicError.cardExpDate;
            }
        }
        if (field.int) {
            if (!value.match(/^[0-9]*$/)) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].int : null;
                return error || this.classicError.int;
            }
        }
        if (field.price) {
            if (!value.match(/^\d+(.\d{1,2})?$/)) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].price : null;
                return error || this.classicError.price;
            }
        }
        if (field.match) {
            const input = document.querySelector(`input[name="${field.match}"]`);
            if (input) {
                if (input.value !== value) {
                    let error = this.errors[name.toString()] ? this.errors[name.toString()].match : null;
                    return error || this.classicError.match;
                }
            }
        }
        if (field.max) {
            if (value > field.max) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].max : null;
                return error || `${this.classicError.max} ${field.max}`;
            }
        }
        if (field.min) {
            if (value < field.min) {
                let error = this.errors[name.toString()] ? this.errors[name.toString()].min : null;
                return error || `${this.classicError.min} ${field.min}`;
            }
        }
    }

    static validate = () => {
        const response = {
            error: {},
            formValid: true,
        }

        const fields = Object.keys(this.fields);

        fields.forEach(fieldName => {
            const error = FormValidator.validateField(fieldName);
            if (error) {
                response.formValid = false;
                response.error[fieldName] = error
            };
        });
        
        return response;
    }
}

// options: {
//     email: {
//         minlen: 8,
//         maxlen: 20,
//         email: true,
//         required: true
//     },
//     password: {
//         minlen: 6,
//         required: true
//     }
// }