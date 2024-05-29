import { Router } from "express";

const router = Router();

let id = 2;
function geraId() {
  id = id + 1;
  return id;
}

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.experiences));
});

router.post('/', (req, res) => {
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

    req.context.models.experiences[id] = experience;

    return res.send(experience);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    let experience = req.context.models.experiences[id];

    if(!experience){
        return res.send("Experiência não encontrado");
    }

    experience = {
        id,
        position: req.body.position,
        company: req.body.company,
        employmentType: req.body.employmentType,
        location: req.body.location,
        modality: req.body.modality,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };

    req.context.models.experiences[id] = experience;

    return res.send(experience);
});

router.delete('/:id', (req, res) => {
    const{
        [req.params.id]: experience,
        ...otherExperiences
    } = req.context.models.experiences;

    if(!experience){
        return res.send("Experiência não encontrado");
    }

    req.context.models.experiences = otherExperiences;

    return res.send(experience);
});

export default router;