import Cpf from '../../src/core/vo/Account/Cpf';

describe('VO: Account Cpf', () => {
    it.each(['97456321558', '71428793860', '87748248800'])('Should validate the cpf %s', function (input) {
        const cpf = new Cpf(input);
        expect(cpf.getValue()).toBe(input);
    });
    
    it('Should not validate a Cpf with less than 11 characters', function () {
        const input = '9745632155';
        expect(() => new Cpf(input)).toThrow(new Error('Invalid cpf.'));
    });
    
    it('Should not validate a Cpf with all characters being the same', function () {
        const input = '11111111111';
        expect(() => new Cpf(input)).toThrow(new Error('Invalid cpf.'));
    });
    
    it('Should not validate a Cpf with non numeric characters', function () {
        const input = '97a56321558';
        expect(() => new Cpf(input)).toThrow(new Error('Invalid cpf.'));
    });
});

