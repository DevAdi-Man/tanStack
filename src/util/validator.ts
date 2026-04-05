import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

// 1. TYPES & INTERFACES (The "Any App" Secret)

export type TranslateFn = (key: string) => string;

export interface ToastOptions {
    type: 'success' | 'error' | 'info' | string;
    text1: string;
}

export interface ToastInstance {
    show: (options: ToastOptions) => void;
}

export interface ValidationResult {
    valid: boolean;
    message: string;
}

export interface SetupValidatorsConfig {
    translateFn?: TranslateFn;
    toastInstance?: ToastInstance;
}

// For the Schema Validator
export interface ValidationSchemaField {
    field: string;
    value: any;
    validators: ((value: any) => ValidationResult)[];
}

export interface SchemaValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

// 2. CONSTANTS & STATE

export const ERROR_MESSAGES = {
    REQUIRED: 'is required',
    INVALID_NAME: 'Please enter a valid name',
    INVALID_EMAIL: 'Please enter valid email address',
    INVALID_PHONE: 'Please enter valid phone number',
    EMPTY_PASSWORD: 'Password should not be empty',
    NO_LOWERCASE: 'Password must contain at least one lowercase letter',
    NO_UPPERCASE: 'Password must contain at least one uppercase letter',
    NO_NUMBER: 'Password must contain at least one number',
    NO_SYMBOL: 'Password must contain at least one special character',
    IS_AGREED: 'Please select checkbox to agree with terms and conditions',
    MIN_LENGTH: 'must be at least',
    CHARACTERS_LONG: 'characters long',
    NOT_MATCH: 'do not match',
    ONLY_LETTERS_ALLOWED: 'Only letters are allowed',
    INVALID_BUSINESS_LICENSE: 'Invalid business license number',
    INVALID_TAX_ID: 'Invalid Tax ID / EIN format',
    INVALID_BANK_REFERENCE: 'Invalid bank reference name',
    INVALID_TRADE_REFERENCE: 'Invalid trade reference',
} as const;

// Default fallback if not injected
let t: TranslateFn = (key: string) => key;
let Toast: ToastInstance | null = null;


// Helper to show toast error with translation
function showError(message: string, showToast: boolean = true): void {
    if (showToast && Toast && t) {
        Toast.show({
            type: 'error',
            text1: t(message),
        });
    }
}

// Inject dependencies once at app startup
export function setupValidators({ translateFn, toastInstance }: SetupValidatorsConfig): void {
    if (translateFn) t = translateFn;
    if (toastInstance) Toast = toastInstance;
}

// Check required field
export function isRequired(value: any, fieldName: string = '', showToast: boolean = true): ValidationResult {
    if (value === undefined || value === null || value.toString().trim() === '') {
        const message = `${fieldName} ${t(ERROR_MESSAGES.REQUIRED)}`.trim();
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check valid email
export function isEmail(email: string, showToast: boolean = true): ValidationResult {
    const regex = /^([a-z0-9_\-\.]+)@([a-z0-9_\-\.]+)\.([a-z]{2,4})$/i;
    if (!email || !regex.test(email)) {
        const message = ERROR_MESSAGES.INVALID_EMAIL;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check valid name
export function isName(name: string, showToast: boolean = true): ValidationResult {
    const regex = /^[A-Za-z\u0600-\u06FF]+(?: [A-Za-z\u0600-\u06FF]+)*$/;
    if (!name || !regex.test(name)) {
        const message = ERROR_MESSAGES.ONLY_LETTERS_ALLOWED;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

export function isInternationalName(name: string, showToast: boolean = true): ValidationResult {
    // \p{L} matches ANY letter in ANY language.
    // \p{M} matches accents and vowel marks (critical for Arabic/Hindi/French).
    // \s matches spaces.
    // The 'u' at the end turns on Unicode mode.
    const regex = /^[\p{L}\p{M}\s'-]+$/u;
    if (!name || !regex.test(name.trim())) {
        const message = t(ERROR_MESSAGES.ONLY_LETTERS_ALLOWED);
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check valid phone number
// NOTE: countryCode should be 'US', 'GB', 'IN', etc., NOT '+1'
export function isPhone(phone: string, countryCode?: CountryCode, showToast: boolean = true): ValidationResult {
    try {
        const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
        if (!phoneNumber || !phoneNumber.isValid()) {
            const message = ERROR_MESSAGES.INVALID_PHONE;
            showError(message, showToast);
            return { valid: false, message };
        }
    } catch {
        const message = ERROR_MESSAGES.INVALID_PHONE;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check password strength
export function isPassword(password: string, showToast: boolean = true): ValidationResult {
    if (!password || password.trim() === '') {
        const message = ERROR_MESSAGES.EMPTY_PASSWORD;
        showError(message, showToast);
        return { valid: false, message };
    }
    if (!/[a-z]/.test(password)) {
        const message = ERROR_MESSAGES.NO_LOWERCASE;
        showError(message, showToast);
        return { valid: false, message };
    }
    if (!/[A-Z]/.test(password)) {
        const message = ERROR_MESSAGES.NO_UPPERCASE;
        showError(message, showToast);
        return { valid: false, message };
    }
    if (!/\d/.test(password)) {
        const message = ERROR_MESSAGES.NO_NUMBER;
        showError(message, showToast);
        return { valid: false, message };
    }
    if (!/[@#$!%*?&]/.test(password)) {
        const message = ERROR_MESSAGES.NO_SYMBOL;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check checkbox agreement
export function isAgreedCheck(isAgreed: boolean, showToast: boolean = true): ValidationResult {
    if (!isAgreed) {
        const message = ERROR_MESSAGES.IS_AGREED;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check minimum length
export function isMinLength(
    value: string | any[],
    min: number,
    fieldName: string = 'This field',
    showToast: boolean = true
): ValidationResult {
    if (!value || value.length < min) {
        const message = `${fieldName} ${t(ERROR_MESSAGES.MIN_LENGTH)} ${min} ${t(ERROR_MESSAGES.CHARACTERS_LONG)}`;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// Check if two values match
export function isMatch(
    value1: any,
    value2: any,
    fieldName1: string = 'Field 1',
    fieldName2: string = 'Field 2',
    showToast: boolean = true
): ValidationResult {
    if (value1 !== value2) {
        const message = `${fieldName1} and ${fieldName2} ${t(ERROR_MESSAGES.NOT_MATCH)}`;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

export function isBusinessLicense(value: string, showToast: boolean = true): ValidationResult {
    const regex = /^[A-Za-z0-9]{5,20}$/;
    if (!value || !regex.test(value)) {
        const message = ERROR_MESSAGES.INVALID_BUSINESS_LICENSE;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

export function isTaxId(value: string, showToast: boolean = true): ValidationResult {
    const regex = /^[A-Za-z0-9-]{5,20}$/;
    if (!value || !regex.test(value)) {
        const message = ERROR_MESSAGES.INVALID_TAX_ID;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

export function isBankReference(value: string, showToast: boolean = true): ValidationResult {
    const regex = /^[A-Za-z\s]{2,100}$/;
    if (!value || !regex.test(value)) {
        const message = ERROR_MESSAGES.INVALID_BANK_REFERENCE;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

export function isTradeReference(value: string, showToast: boolean = true): ValidationResult {
    const regex = /^[A-Za-z\s]{2,100}$/;
    if (!value || !regex.test(value)) {
        const message = ERROR_MESSAGES.INVALID_TRADE_REFERENCE;
        showError(message, showToast);
        return { valid: false, message };
    }
    return { valid: true, message: '' };
}

// 4. SCHEMA VALIDATOR

export function validateFormSchema(schema: ValidationSchemaField[]): SchemaValidationResult {
    const errors: Record<string, string> = {};

    schema.forEach(({ field, value, validators }) => {
        for (const validator of validators) {
            const result = validator(value);
            if (!result.valid) {
                errors[field] = result.message;
                break; // Stop at first failed validator for this field
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
