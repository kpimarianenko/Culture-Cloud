export default class FormValidator {
    static classicError = {
        required: 'This field cannot be empty',
        length: 'Field must contains concrete numbers of characters',
        cardExpDate: 'Date must be in format (MM/YY)',
        email: 'Incorrect email',
        int: 'This field can contains integer numbers only',
        price: 'Invalid format for price',
        match: "Passwords doesn't match",
        minlen: 'Field is too short',
        maxlen: 'Field is too long',
        min: 'Number is too small',
        max: 'Number is too big',
    }
    
    setOptions(options) {
        this.fields = options.fields || {};
        this.errors = options.errors || {};
        return this.validate;
    }

    validateField(name) {
        const target = document.querySelector(`[name="${name}"]`);
        if (!target) return;
        const value = target.value;
        const field = this.fields[name.toString()];
        if (field.required && !value) return this.getError(name, 'required')
        if (field.minlen && value.length < field.minlen) return this.getError(name, 'minlen')
        if (field.maxlen && value.length > field.maxlen) return this.getError(name, 'maxlen')
        if (field.length && value.length !== field.length) return this.getError(name, 'length')
        if (field.email && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return this.getError(name, 'email')
        if (field.cardExpDate && !value.match(/^\d{2}\/\d{2}$/)) return this.getError(name, 'cardExpDate')
        if (field.int && !value.match(/^[0-9]*$/)) return this.getError(name, 'int')
        if (field.price && !value.match(/^(\d+(.\d{1,2})?)?$/)) return this.getError(name, 'price')
        if (field.max && value > field.max) return this.getError(name, 'max')
        if (field.min && value < field.min) return this.getError(name, 'min')
        if (field.match) {
            const input = document.getElementsByName(field.match)[0];
            if (input && input.value !== value) return this.getError(name, 'match')
        }
        if (field.lt) {
            const input = document.getElementsByName(field.lt)[0];
            if (input && parseFloat(input.value) < parseFloat(value)) return this.getError(name, 'min')
        }
        if (field.gt) {
            const input = document.getElementsByName(field.gt)[0];
            if (input && parseFloat(input.value) > parseFloat(value)) return this.getError(name, 'max')
        }
    }

    getError(fieldName, option) {
        let error = this.errors[fieldName.toString()] ? this.errors[fieldName.toString()][option] : null;
        return error || FormValidator.classicError[option];
    }

    validate = () => {
        const response = {
            error: {},
            formValid: true,
        }

        const fields = Object.keys(this.fields);

        fields.forEach(fieldName => {
            const error = this.validateField(fieldName);
            if (error) {
                response.formValid = false;
                response.error[fieldName] = error
            };
        });
        
        return response;
    }
}