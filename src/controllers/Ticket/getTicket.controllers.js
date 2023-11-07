import ticketModel from "../../models/ticket.model.js";

export const getTickets = async(req,res) => {
    try {
        const tickets = await ticketModel.find()
        res.status(200).send({response: tickets})
    } catch (error) {
        res.status(400).send({error: `Error al solicitar tickets: ${error}`})
    }
};

