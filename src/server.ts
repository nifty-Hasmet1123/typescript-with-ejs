import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { Request, Response } from "express-serve-static-core";
import path from "path";

// interface 1st
// interface AccessKey extends Request {
//     accessToken?: string;
//     user?: string;
// }

// interface 2nd
interface AttrRequestExtender<T> extends Request {
    accessToken?: T;
    user?: T
}

const app: ReturnType<typeof express> = express();
const PORT: number = 8080;
const pathToViewsLayout = path.join(__dirname, "views/layouts/main.ejs");
const pathToViews = path.join(__dirname, "views");
const pathToPublic = path.join(process.cwd(), "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ejs layout engine here
app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", pathToViewsLayout);
app.set("views", pathToViews);
app.use(express.static(pathToPublic));

// route here 

// 1st
// app.get("/", <T extends AccessKey>(req: T, res: Response): void => {
//     res.status(200).send("Hello world");
// })
// app.get("/", (req: AccessKey, res: Response): void => {
//     res.status(200).send("Hello world");
// })

// 2nd
app.get("/interface-generics", (req: AttrRequestExtender<string>, res: Response): void => {
    req.accessToken = "hello";
    req.user = "Maximo";

    res.status(200).json({
        accessToken: req.accessToken,
        user: req.user
    });
})


app.use("/", (req: Request, res: Response) => {
    res.render("Home.ejs", {
        title: "Typescript with EJS Template",
        author: "Maximo Ignacio",
        keywords: "TypeScript, Express, EJS, Express-JS-Layouts, TS-NODE-DEV",
        description: "TS-NODE-DEV ALTERNATIVE FOR NODEMON"
    });
})


app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})

