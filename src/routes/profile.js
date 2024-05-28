import { v4 as uuid } from "uuid";
import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.profiles));
});

router.post('/', (req, res) => {
    const id = uuid();
    const profile = {
        id,
        name: req.body.name,
        lastName: req.body.lastName,
        title: req.body.title,
        about: req.body.about,
        number: req.body.number,
        location: req.body.location,
        email: req.body.email,
        github: req.body.github,
        linkedin: req.body.linkedin
    };

    req.context.models.profiles[id] = profile;

    return res.send(profile);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    let profile = req.context.models.profiles[id];

    if(!profile){
        return res.send("Perfil não encontrado");
    }

    profile = {
        id,
        name: req.body.name,
        lastName: req.body.lastName,
        title: req.body.title,
        about: req.body.about,
        number: req.body.number,
        location: req.body.location,
        email: req.body.email,
        github: req.body.github,
        linkedin: req.body.linkedin
    };

    req.context.models.profiles[id] = profile;

    return res.send(profile);
});

router.delete('/:id', (req, res) => {
    const{
        [req.params.id]: profile,
        ...otherProfiles
    } = req.context.models.profiles;

    if(!profile){
        return res.send("Perfil não encontrado");
    }

    req.context.models.profiles = otherProfiles;

    return res.send(profile);
});

export default router;