import "dotenv/config";
import cors from 'cors';
import express from 'express';
import models from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.profiles[1]
    };
    next();
});

app.use('/profiles', routes.profile);
app.use('/experiences', routes.experience);

app.listen(process.env.PORT, () => {
    console.log(`the app is listening on port ${process.env.PORT}`)
});