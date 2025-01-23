import express from "express"
import mongoose, { connect } from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import teacherRoute from "./routes/teacherRoute.js"
import courseRoute from "./routes/courseRoute.js"
import enrollmentRoute from "./routes/enrollmentRoute.js"
import lessonRoute from "./routes/lessonRoute.js"
import quizRoute from "./routes/quizRoute.js"
import { connectDB } from "./config/db.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.MONGO_URI)

const PORT = process.env.PORT

app.listen(PORT, () => {
    connectDB();
    console.log('server started at http://localhost:' + PORT)
})


app.use("/api/user", userRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/course", courseRoute);
app.use("/api/enrollment", enrollmentRoute);
app.use("/api/lesson", lessonRoute);
app.use("/api/quiz", quizRoute);
