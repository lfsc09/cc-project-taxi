export default class Cpf {
    private cpf_valid_length: number = 11;
    private first_digit_factor: number = 10;
    private second_digit_factor: number = 11;
    private value: string;

    constructor(value: string) {
        if (!this.validateCpf(value)) throw new Error('Invalid cpf.');
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    private validateCpf(value: string) {
        let cpf = value.replace(/\D/g, '');
        if (cpf.length !== this.cpf_valid_length) return false;
        if (this.allDigitsTheSame(cpf)) return false;
        const digit1 = this.calculateDigit(cpf, this.first_digit_factor);
        const digit2 = this.calculateDigit(cpf, this.second_digit_factor);
        return `${digit1}${digit2}` === this.extractDigit(cpf);
    }

    private allDigitsTheSame(value: string) {
        const [firstDigit] = value;
        return [...value].every((digit) => digit === firstDigit);
    }

    private calculateDigit(value: string, factor: number) {
        let total = 0;
        for (const digit of value) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const remainder = total % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    private extractDigit(value: string) {
        return value.slice(9);
    }
}
