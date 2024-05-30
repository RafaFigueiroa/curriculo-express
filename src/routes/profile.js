import { Router } from "express";

const router = Router();

let id = 1;
function geraId() {
  id = id + 1;
  return id;
}

router.get('/', async (req, res) => {
    const profiles = await req.context.models.Profile.findAll();

    if(!profiles){
        return res.status(404).json("Nenhum perfil encontrado");
    }

    return res.status(200).json(profiles);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const profile = await req.context.models.Profile.findByPk(id);

    if(!profile){
        return res.status(404).json("Perfil não encontrado");
    }

    return res.status(200).json(profile);
});

router.post('/', async (req, res) => {
    const id = geraId();
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
    
    await req.context.models.Profile.create(profile);

    return res.status(201).json("Perfil criado");
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Profile.findByPk(id)){
        return res.send("Perfil não encontrado");
    }

    await req.context.models.Profile.update(
        {
            name: req.body.name,
            lastName: req.body.lastName,
            title: req.body.title,
            about: req.body.about,
            number: req.body.number,
            location: req.body.location,
            email: req.body.email,
            github: req.body.github,
            linkedin: req.body.linkedin
        },
        { where: { id }}
    );

    return res.status(202).json("Perfil atualizado");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    if(!req.context.models.Profile.findByPk(id)){
        return res.status(404).json("Perfil não encontrado");
    }

    await req.context.models.Profile.destroy({ where: { id } });

    return res.status(202).json("Perfil deletado");
});

export default router;