const { Client } = require('pg');

function getConnection(username, password, database) {
    return new Client({
        host: 'localhost',
        database,
        user: username,
        password,
        port: 5432
    });
}

/////////
// const client = getConnection(
//     'postgres',
//     'hugoat94110',
//     'test_back'
// );
// console.log(client);

function getUsers(callback) {
    const client = getConnection(
        process.env.dbuser,
        process.env.dbpwd,
        'test_back'
    );

    client.connect((connectionError) => {
        if (connectionError) {
            callback(connectionError);
            return;
        }

        // query
        client.query('select * from users', (queryError, result) => {
            client.end();

            if (queryError) {
                callback(queryError);
                return;
            }
            callback(null, result.rows);
        });
    });
}

// test
// getUsers((error, users) => {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     console.log(users);
// });

function insertUser(email, callback) {
    const client = getConnection(
        process.env.dbuser,
        process.env.dbpwd,
        'test_back'
    );

    client.connect((connectionError) => {
        if (connectionError) {
            callback(connectionError);
            return;
        }

        // query + returning
        client.query('insert into users (email) values ($1) returning *', [email], (queryError, result) => {
            client.end();

            if (queryError) {
                callback(queryError);
                return;
            }
            callback(null, result.rows[0]);
        });
    });
}

// test
insertUser('test.test@test.com', (error, user) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(user);
});