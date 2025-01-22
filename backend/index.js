import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import teacherRoute from "./routes/teacherRoute.js"
import courseRoute from "./routes/courseRoute.js"
import enrollmentRoute from "./routes/enrollmentRoute.js"
import lessonRoute from "./routes/lessonRoute.js"
import quizRoute from "./routes/quizRoute.js"


const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected successful.")
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => console.log(error));


app.use("/api/user", userRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/course", courseRoute);
app.use("/api/enrollment", enrollmentRoute);
app.use("/api/lesson", lessonRoute);
app.use("/api/quiz", quizRoute);
