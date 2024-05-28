import { v4 as uuid } from "uuid";
import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.personalInfos));
});

router.post('/', (req, res) => {
    const id = uuid();
    const personalInfo = {
        id,
        name: req.body.name,
        lastName: req.body.lastName,
        title: req.body.title,
        about: req.body.about
    };

    req.context.models.personalInfos[id] = message;

    return res.send(personalInfo);
});

router.put('/', (req, res) => {
    res.send("atualizando as informações pessoais");
});

router.delete('/', (req, res) => {
    res.send("deletando as informações pessoais");
});

export default router;