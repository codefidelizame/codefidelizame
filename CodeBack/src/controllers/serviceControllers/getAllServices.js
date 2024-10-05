const { Service } = require('../../data');

// Obtener todos los servicios
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            include: [{ model: Client }, { model: Comercio }],
        });

        res.status(200).json({
            message: 'Lista de servicios obtenida con éxito',
            services,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios', error });
    }
};
