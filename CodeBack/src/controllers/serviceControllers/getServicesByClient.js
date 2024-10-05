const { Service } = require('../../data');

// Obtener servicios por cliente
exports.getServicesByClient = async (req, res) => {
    const { clientId } = req.params;

    try {
        const services = await Service.findAll({
            where: { clientId },
            include: [{ model: Client }, { model: Comercio }],
        });

        if (!services.length) {
            return res.status(404).json({ message: 'No se encontraron servicios para este cliente' });
        }

        res.status(200).json({
            message: 'Servicios del cliente obtenidos con éxito',
            services,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios del cliente', error });
    }
};
