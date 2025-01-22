import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"
import route from "./routes/teacherRoute.js"
import route from "./routes/courseRoute.js"
import route from "./routes/enrollmentRoute.js"
import route from "./routes/lessonRoute.js"
import route from "./routes/quizRoute.js"


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


app.use("/api/user", route);
app.use("/api/teacher", route);
app.use("/api/course", route);
app.use("/api/enrollment", route);
app.use("/api/lesson", route);
app.use("/api/quiz", route);

