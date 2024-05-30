import { Router } from "express";

const router = Router();

let id = 2;
const geraId = () => {
    id++;
    return id;
}

router.get('/', async (req, res) => {
    const certifications = await req.context.models.Certification.findAll();

    if(!certifications) {
        return res.status(404).json("Nenhuma certificação encontrada")
    }

    return res.status(200).json(certifications);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const certification = await req.context.models.Certification.findByPK(id);

    if(!certification) {
        return res.status(404).json("Certificação não encontrada")
    }

    return res.status(200).json(certification);
});

router.post('/', async (req, res) => {
    const id = geraId();
    const certification = {
        id,
        name: req.body.name,
        issuingOrganization: req.body.issuingOrganization,
        issueDate: req.body.issueDate
    }

    await req.context.models.Certification.create(certification);

    return res.status(201).json(certification);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Certification.findByPk(id)) {
        return res.status(404).json("Certificação não encontrada");
    }

    await req.context.models.Certification.update(
        {
            name: req.body.name,
            issuingOrganization: req.body.issuingOrganization,
            issueDate: req.body.issueDate
        },
        { where: { id }}
    );

    return res.status(202).json("Certificação atualizada");
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Certification.findByPk(id)) {
        return res.status(404).json("Certificação não encontrada");
    }

    req.context.models.Certification.destroy({ where: { id }});

    return res.status(202).json("Certificação deletada");
});

export default router;