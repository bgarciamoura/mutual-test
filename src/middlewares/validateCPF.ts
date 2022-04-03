import { NextFunction, Request, Response } from 'express';

const validateCPF = (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body;

    const sanitizedCPF = cpf.replace(/[^\d]+/g, '');

    if (!sanitizedCPF) {
        return res.status(400).send({ error: 'CPF is required' });
    }

    if (typeof sanitizedCPF !== 'string') {
        return res.status(400).send({ error: 'CPF must be a string' });
    }

    if (sanitizedCPF.length !== 11) {
        return res.status(400).send({ error: 'CPF must have 11 digits' });
    }

    if (
        sanitizedCPF === '00000000000' ||
        sanitizedCPF === '11111111111' ||
        sanitizedCPF === '22222222222' ||
        sanitizedCPF === '33333333333' ||
        sanitizedCPF === '44444444444' ||
        sanitizedCPF === '55555555555' ||
        sanitizedCPF === '66666666666' ||
        sanitizedCPF === '77777777777' ||
        sanitizedCPF === '88888888888' ||
        sanitizedCPF === '99999999999'
    ) {
        return res.status(400).send({ error: 'CPF is invalid' });
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(sanitizedCPF.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(sanitizedCPF.substring(9, 10))) {
        return res.status(400).send({ error: 'CPF is invalid' });
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(sanitizedCPF.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(sanitizedCPF.substring(10, 11))) {
        return res.status(400).send({ error: 'CPF is invalid' });
    }

    next();
};

export { validateCPF };
