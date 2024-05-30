import { Router } from "express";

const router = Router();

let id = 2;
function geraId() {
  id = id + 1;
  return id;
}

router.get('/', async (req, res) => {
    const experiences = await req.context.models.Experience.findAll();

    if(!experiences){
        return res.status(404).json("Nenhuma experiência encontrada");
    }

    return res.status(200).json(experiences);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const experience = await req.context.models.Experience.findByPk(id);

    if(!experience){
        return res.status(404).json("Experiência não encontrada");
    }

    return res.status(200).json(experience);
});

router.post('/', async (req, res) => {
    const id = geraId();
    const experience = {
        id,
        position: req.body.position,
        company: req.body.company,
        employmentType: req.body.employmentType,
        location: req.body.location,
        modality: req.body.modality,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };

    await req.context.models.Experience.create(experience);

    return res.status(201).json(experience);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Experience.findByPk(id)){
        return res.status(404).json("Experiência não encontrado");
    }

    await req.context.models.Experience.update(
        {
            position: req.body.position,
            company: req.body.company,
            employmentType: req.body.employmentType,
            location: req.body.location,
            modality: req.body.modality,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        },
        { where: { id }}
    );

    return res.status(202).json("Experiência atualizada");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Experience.findByPk(id)){
        return res.status(404).json("Experiência não encontrada");
    }

    await req.context.models.Experience.destroy({ where: { id }});

    return res.status(202).json("Experiência deletada");
});

export default router;