import Usuario from '../../models/usuario.model.js';

export const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

export const getUsuariosById = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.status(200).json(usuario);
};

export const createUsuarios = async (req, res) => {
    const newUsuario = new Usuario(req.body);
    const UsuarioSaved = await newUsuario.save();
    res.status(201).json(UsuarioSaved);
};

export const updateUsuarios = async (req, res) => {
    const updatedProduct = await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedProduct);
};

export const deleteUsuarios = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).json();
};
