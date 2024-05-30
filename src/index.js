import "dotenv/config";
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( async (req, res, next) => {
    req.context = {
        models,
        me: await models.Profile.findByLogin('Rafael'),
    };
    next();
});

app.use('/profiles', routes.profile);
app.use('/experiences', routes.experience);
app.use('/educations', routes.education);
app.use('/certifications', routes.certification);
app.use('/session', routes.session);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
    if(eraseDatabaseOnSync){
        createInitialProfile();
    }

    app.listen(process.env.PORT, () => {
        console.log(`the app is listening on port ${process.env.PORT}`)
    });
});

const createInitialProfile = async () => {
    await models.Profile.create(
        {  
            name: 'Rafael',
            lastName: 'Figueiroa',
            title: 'Desenvolvedor | JavaScript | Java | Estudante de Sistemas para Internet',
            about: 'Estudante de Sistemas para Internet pelo programa Embarque Digital, técnico em Programação de Jogos Digitais. Interessado pela área de Desenvolvimento Web com React Native, mas também possuo conhecimento nas linguagem de C#, Java e Python.',
            number: '81992682273',
            location: 'Recife, Pernambuco',
            email: 'rafatinsfig@gmail.com',
            github: 'https://github.com/rafafigueiroa',
            linkedin: 'https://linkdin.com/in/rafael-figueiroa',
            experiences: [
                {
                    position: "Desenvolvedor de software",
                    company: "Combogó UNICAP",
                    employmentType: "Aprendiz",
                    location: "Recife, Pernambuco",
                    modality: "Presencial",
                    startDate: "Março/2024",
                    endDate: null
                },
                {
                    position: "Residente de engenharia de software",
                    company: "Porto Digital",
                    employmentType: "Aprendiz",
                    location: "Recife, Pernambuco",
                    modality: "Hybrid",
                    startDate: "Agosto/2022",
                    endDate: null
                },
            ],
            educations: [
                {
                    school: "ETE Cícero Dias",
                    degree: "Ensino médio e técnico",
                    course: "Programação de Jogos Digitais",
                    startDate: "Janeiro/2019",
                    endDate: "Dezembro/2021"
                },
                {
                    school: "UNICAP",
                    degree: "Tecnólogo",
                    course: "Sistemas para Internet",
                    startDate: "Agosto/2022",
                    endDate: null
                }
            ],
            certifications: [
                {
                    name: "Desafio Globo 2.0 Rec'n'Play",
                    issuingOrganization: "Globo",
                    issueDate: "Outubro/2023"
                },
                {
                    name: "JavaScript e HTML: desenvolva um jogo e pratique lógica de programação",
                    issuingOrganization: "Alura",
                    issueDate: "Abril/2023"
                },
            ],
        },
        {
            include: [
                models.Experience,
                models.Education,
                models.Certification
            ],
        },
    );
};