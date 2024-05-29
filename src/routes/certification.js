import { Router } from "express";

const router = Router();

let id = 2;
const geraId = () => {
    id++;
    return id;
}

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.certifications));
});

router.post('/', (req, res) => {
    const id = geraId();
    const certification = {
        id,
        name: req.body.name,
        issuingOrganization: req.body.issuingOrganization,
        issueDate: req.body.issueDate
    }

    req.context.models.certifications[id] = certification;

    return res.send(certification);
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    let certification = req.context.models.certifications[id];

    if(!certification) {
        return res.send("Certificação não encontrada");
    }

    certification = {
        id,
        name: req.body.name,
        issuingOrganization: req.body.issuingOrganization,
        issueDate: req.body.issueDate
    }

    req.context.models.certifications[id] = certification;

    return res.send(certification);
});

router.delete('/:id', (req, res) => {
    const {
        [req.params.id]: certification,
        ...otherCertifications
    } = req.context.models.certifications

    if(!certification) {
        return res.send("Certificação não encontrada");
    }

    req.context.models.certifications = otherCertifications;

    return res.send(certification);
})

export default router;