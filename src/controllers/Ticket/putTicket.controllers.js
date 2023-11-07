import ticketModel from "../../models/ticket.model.js";

export const putTicket = async(req,res) => {
    const {amount, email} = req.body;
    try {
        const ticket = await ticketModel.create({ 
            amount: amount, 
            purchaser: email 
        });
        if(ticket){
            return res.status(201).send(ticket);
        }
        res.status(404).send({ error: 'Ticket no encontrado' });
    } catch (error) {
        res.status(400).send({ error: `Error al crear ticket ${error}` });
    }
};