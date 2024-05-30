import { Router } from "express";

const router = Router();

let id = 2;
const geraId = () => {
    id++;
    return id;
}

router.get('/', async (req, res) => {
    const educations = await req.context.models.Education.findAll();

    if(!educations){
        return res.status(404).json("Nenhuma formação encontrada");
    }

    return res.status(200).json(educations);
});

router.get('/id', async (req, res) => {
    const id = req.params.id;
    const education = await req.context.models.Education.findByPk(id);

    if(!education){
        return res.status(404).json("Formação não encontrada");
    }

    return res.status(200).json(education);
})

router.post('/', async (req, res) => {
    const id = geraId();
    const education = {
        id,
        school: req.body.school,
        degree: req.body.degree,
        course: req.body.course,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    }

    await req.context.models.Education.create(education);

    return res.status(201).json(education);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Education.findByPk(id)) {
        return res.status(404).json("Formação não encontrada");
    }

    await req.context.models.Education.update(
        {
            id,
            school: req.body.school,
            degree: req.body.degree,
            course: req.body.course,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        },
        { where: { id }}
    );

    return res.status(202).json("Formação atualizada");
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Education.findByPk(id)) {
        return res.status(404).json("Formação não encontrada");
    }

    req.context.models.Education.destroy({ where: { id }});

    return res.status(202).json("Formação deletada");
});

export default router;