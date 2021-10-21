const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
const port = 8080;
const link = `http://localhost:${port}`;

app.use(express.json());

const customers = []

// Middlewares -- Início --
function verifyIfExistsAccountCPF(req, res, next) {
    const { cpf } = req.headers;
    const customer = customers.find((customer) => customer.cpf == cpf);

    if(!customer) {
        res.status(400).json({error: "Customer not found"});
    }

    req.customer = customer;
    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((accumulator, operation) => {
        if(operation.type === 'credit') {
            return accumulator + operation.amount;
        } else {
            return accumulator - operation.amount;
        }
    }, 0);

    return balance;
}
// Middlewares -- Fim --

// Criando uma nova conta
app.post('/account', (req, res) => {
    const {cpf, name} = req.body;
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if( customerAlreadyExists) {
        res.status(400).json({error: "Customer already exists!"});
    }
 
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });

    res.status(201).send();

});

//app.use(verifyIfExistsAccountCPF);

// Verificando o extrato (statement) da conta
app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;
    res.json(customer.statement);
});

// Efetuando um depósito em conta
app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
    const {description, amount} = req.body;
    const {customer} = req;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation);

    res.status(201).send();
})

// Efetuando um saque na conta
app.post('/withdraw', verifyIfExistsAccountCPF,(req, res) => {
    const {amount} = req.body;
    const {customer} = req;

    const balance = getBalance(customer.statement);

    if(balance < amount) {
        res.status(400).json({error: 'Insuficient funds!'});
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'withdraw'
    };

    customer.statement.push(statementOperation);

    res.status(201).send();
})

// Buscando extrato bancário por data
app.get('/statement/date', verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;
    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter((statement) =>
    statement.created_at.toDateString() === new Date(dateFormat).toDateString());

    res.json(statement);
});

// Atualizando dados da conta do cliente
app.put('/account', verifyIfExistsAccountCPF, (req, res) => {
    const {name} = req.body;
    const {customer} = req;

    customer.name = name;

    res.status(201).send();
});

// Trazendo as informações da conta
app.get('/account', verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;

    res.json(customer);
    res.status(201).send();
})

// Deletando uma conta existente
app.delete('/account', verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;

    customers.splice(customer, 1);

    res.status(200).json(customers);
});

// Trazendo todas as contas cadastradas
app.get('/account/all', (req, res) => {
    res.status(200).json(customers);
});

// Retornando o balanço da conta
app.get('/balance', verifyIfExistsAccountCPF, (req, res) => {
    const {customer} = req;
    const balance = getBalance(customer.statement);

    res.status(200).json({"Saldo em conta": balance});
})

// Servidor
app.listen(port, (req, res) => {
    console.log(`servidor ativo. Acesse em: ${link}`);
})