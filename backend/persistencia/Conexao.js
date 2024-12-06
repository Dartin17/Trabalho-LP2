import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default async function conectar(){
    try{
        if (global.poolConexoes){
            return await global.poolConexoes.getConnection();
        }
        else{
            global.poolConexoes = mysql.createPool({
                "host": process.env.HOST,
                "port": process.env.PORTA,
                "database": process.env.DATABASE,
                "user": process.env.USER,
                "password": process.env.PASSWORD,
                "connectionLimit": 20,
                "connectTimeout": 60000,
                "waitForConnections": true,
                "queueLimit": 20
            });
            return await global.poolConexoes.getConnection();
        }
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados: ", error.message);
    }

}