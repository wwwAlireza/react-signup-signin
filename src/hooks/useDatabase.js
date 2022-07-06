import React, { useEffect } from "react";

const useDatabase = (databaseName) => {
    return (config) => {
        const { type, username, email, password } = config;
        let returnData;

        // database on localStorage
        let database = localStorage.getItem(databaseName);
        if (!database) {
            localStorage.setItem(databaseName, JSON.stringify([{ index: 0, username: "admin", email: "admin@gmail.com", password: "admin" }]));
            database = localStorage.getItem(databaseName);
            database = JSON.parse(database);
        } else {
            database = JSON.parse(database);
        }
        const readDatabase = () => {
            database = localStorage.getItem(databaseName);
            database = JSON.parse(database);
        }
        const updateDatabase = () => {
            database = JSON.stringify(database);
            localStorage.setItem(databaseName, database);
        }

        // CRUD
        // create user
        const createUser = (username, email, password) => {
            readDatabase();
            let index = database.length;
            database[index] = { index, username, email, password };
            updateDatabase();
        };

        // read user
        const readUser = (username, email = '') => {
            readDatabase();
            let findUser = database.map(user => {
                if (user.username == username || user.email == email) {
                    return user;
                }
            })
            findUser = findUser.filter(Boolean)
            returnData = findUser[0];
        };

        // check user
        const checkUser = (username, email = '') => {
            readDatabase();
            let checkUser = database.map(user => {
                if (user.username == username) {
                    return { exist: true, via: "username" }
                } else if (user.email == email) {
                    return { exist: true, via: "email" }
                }
            })
            checkUser = checkUser.filter(Boolean);
            if (checkUser[0] == undefined) {
                checkUser[0] = { exist: false }
            }
            returnData = checkUser[0];
        }

        switch (type) {
            case "CREATE": {
                createUser(username, email, password)
            } break;
            case "READ": {
                readUser(username, email);
            } break;
            case "CHECK": {
                checkUser(username, email)
            }
        }
        return returnData;

    }
};

export default useDatabase;