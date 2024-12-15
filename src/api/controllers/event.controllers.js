const  sportsEvent = require("../models/event_model")

        const addEvent = async (req, res) => {
            try {
                const newEvent = new sportsEvent(req.body);
                const createdEvent = await newEvent.save();
                return res.status(201).json({
                    message: "Evento creado exitosamente",
                    event: createdEvent,
                });
            } catch (error) {
                console.error("Error al crear el evento:", error.message);
                return res.status(500).json({ message: "Error al crear el evento", error: error.message });
            }
        };

        const getAll = async (req, res) => {
            try {
                const list = await sportsEvent.find().populate("nombre", "sport");
                return res.status(200).json({
                    message: "Eventos obtenidos correctamente",
                    events: list,
                });
            } catch (error) {
                console.error("Error al obtener eventos:", error.message);
                return res.status(500).json({ message: "Error al obtener eventos", error: error.message });
            }
        };

        const getByid = async (req, res) => {
            try {
                const idEvent = req.params.id;
                const findEvent = await sportsEvent.findById(idEvent);
                if (!findEvent) {
                    return res.status(404).json({ message: "El evento no existe" });
                }
                return res.status(200).json({
                    message: "Evento encontrado",
                    event: findEvent,
                });
            } catch (error) {
                console.error("Error al buscar el evento:", error.message);
                return res.status(500).json({ message: "Error al buscar el evento", error: error.message });
            }
        };

        const updateEvent = async (req, res) => {
            try {
                const id = req.params.id;
                const sportEvent = req.body;
                const updatedEvent = await sportsEvent.findByIdAndUpdate(id, sportEvent, { new: true });
                if (!updatedEvent) {
                    return res.status(404).json({ message: "El evento no existe" });
                }
                return res.status(200).json({
                    message: "Evento actualizado exitosamente",
                    event: updatedEvent,
                });
            } catch (error) {
                console.error("Error al actualizar el evento:", error.message);
                return res.status(500).json({ message: "Error al actualizar el evento", error: error.message });
            }
        };

        const deleteEvent = async (req, res) => {
            try {
                const deletedEvent = await sportsEvent.findByIdAndDelete(req.params.id);
                if (!deletedEvent) {
                    return res.status(404).json({ message: "El evento no existe" });
                }
                return res.status(200).json({
                    message: "Evento eliminado exitosamente",
                    event: deletedEvent,
                });
            } catch (error) {
                console.error("Error al eliminar el evento:", error.message);
                return res.status(500).json({ message: "Error al eliminar el evento", error: error.message });
            }
        };


        const getUpcomingEvents = async (req, res) => {
            try {
                const today = new Date();
                const events = await sportsEvent
                    .find({ date: { $gte: today } }) 
                    .sort({ date: 1 }); 
                return res.status(200).json(events);
            } catch (error) {
                console.error("Error al obtener eventos próximos:", error.message);
                return res.status(500).json({ message: "Error al obtener eventos próximos", error: error.message });
            }
        };

        const getEventsByType = async (req, res) => {
            try {
                const { type } = req.query;
        
                if (!type) {
                    return res.status(400).json({ message: "El tipo de deporte es requerido" });
                }
        
                const events = await sportsEvent.find({ sport: type });
        
                if (events.length === 0) {
                    return res.status(404).json({ message: `No se encontraron eventos para el deporte: ${type}` });
                }
        
                return res.status(200).json(events);
            } catch (error) {
                console.error("Error al obtener eventos por tipo:", error.message);
                return res.status(500).json({ message: "Error al obtener eventos por tipo", error: error.message });
            }
        };

        const getEventsByDateRange = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "Las fechas 'from' y 'to' son requeridas" });
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (isNaN(fromDate) || isNaN(toDate)) {
            return res.status(400).json({ message: "Las fechas proporcionadas no son válidas" });
        }

        const events = await sportsEvent.find({
            date: {
                $gte: fromDate, 
                $lte: toDate,  
            },
        });

        if (events.length === 0) {
            return res.status(404).json({ message: "No se encontraron eventos en el rango de fechas especificado" });
        }

        return res.status(200).json(events);
    } catch (error) {
        console.error("Error al obtener eventos por rango de fechas:", error.message);
        return res.status(500).json({ message: "Error al obtener eventos por rango de fechas", error: error.message });
    }
};






module.exports={addEvent,getAll,getByid,updateEvent,deleteEvent,getUpcomingEvents,getEventsByType,getEventsByDateRange}