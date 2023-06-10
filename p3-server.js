const fs = require('fs'); 
const fastify = require('fastify')();
const { coinCount } = require('./p3-module.js');

fastify.get('/', (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            reply.code(500).send('Error reading index.html');
         } else {
            reply.code(200).header('Content-Type', 'text/html').send(data);
         }
    });
});
const host = 'localhost';
const port = 8080;

fastify.listen(port, host, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is listening on http://${host}:${port}`);
});

fastify.get('/coin', (request, reply) => {
    const { denom = 0, count = 0 } = request.query
    const intDenom = parsInt(denom);
    const intCount = parseInt(count);

    const coinValue = coinCount({ denom: intDenom, count: intCount });

    reply

    .header('Content-Type', 'text/html')
    .send(`<h2>Value of ${intCount} of ${intDenom} is ${coinValue}<h2><br /><a href="/">Home</a>`);
});

fastify.get('coins', (request, reply) => {
    const { option } = request.query;
    let coinValue = 0;

    const coins = [{ denom: 5, count: 3 }, { denom: 10, count: 2}];

    switch (option) {
        case '1':
            coinValue = coinCount({ denom: 5, count: 3}, { denom: 10, count: 2});
            break;
            case '2'
            coinValue =coinCount(...coins);
    }

    reply
    .code(200)
    .header('Content-Type', 'text/html')
    .send(`<h2>Option ${option} value is ${coinValue}<h2><br /><a href="/">Home</a>`);
});