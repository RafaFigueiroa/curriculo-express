import { Router } from "express";

const router = Router();

let id = 2;
const geraId = () => {
    id++;
    return id;
}

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.educations));
});

router.post('/', (req, res) => {
    const id = geraId();
    const education = {
        id,
        school: req.body.school,
        degree: req.body.degree,
        course: req.body.course,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    }

    req.context.models.educations[id] = education;

    return res.send(education);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    let education = req.context.models.educations[id];

    if(!education) {
        return res.send("Formação não encontrada");
    }

    education = {
        id,
        school: req.body.school,
        degree: req.body.degree,
        course: req.body.course,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    }

    req.context.models.educations[id] = education;

    return res.send(education);
});

router.delete('/:id', (req, res) => {
    const {
        [req.params.id]: education,
        ...otherEducations
    } = req.context.models.educations

    if(!education) {
        return res.send("Formação não encontrada");
    }

    req.context.models.educations = otherEducations;

    return res.send(education);
})

export default router;