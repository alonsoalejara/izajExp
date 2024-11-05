import Figura from '../../models/figura.model.js';

export const getFiguras = async (req, res) => {
    const figuras = await Figura.find();
    res.json(figuras);
};

export const getFigurasById = async (req, res) => {
    const figura = await Figura.findById(req.params.id);
    res.status(200).json(figura);
};

export const createFiguras = async (req, res) => {
    const newFigura = new Figura(req.body);
    const FiguraSaved = await newFigura.save();
    res.status(201).json(FiguraSaved);
};

export const updateFiguras = async (req, res) => {
    const updatedFiguras = await Figura.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedFiguras);
};

export const deleteFiguras = async (req, res) => {
    await Figura.findByIdAndDelete(req.params.id);
    res.status(204).json();
};
