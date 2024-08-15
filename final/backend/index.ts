import express,{Express} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';
dotenv.config()
const PORT=process.env.PORT||3000;

const app:Express=express();
app.use(bodyParser.json());
app.use(cors());
//Database
export const AppDataSource=new DataSource({
	type:'postgres',
	host:'localhost',
	port:5432,
	username:process.env.DB_USERNAME,
	password:process.env.PASSWORD,
	database:process.env.DB,
	synchronize:true,
	entities:[Task]
});



app.use('/',tasksRouter);


AppDataSource.initialize().then(()=>{
	app.listen(PORT,()=>{
		console.log("Database connection sucessful")
		console.log(`Backend is running on http://localhost:${PORT}`);
	});
}).catch((error)=>{
	console.log("Databse connection error:",error);
});