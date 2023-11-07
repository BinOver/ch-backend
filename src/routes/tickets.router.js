import { Router } from 'express';
import { getTickets } from '../controllers/Ticket/getTicket.controllers.js'
import { putTicket } from '../controllers/Ticket/putTicket.controllers.js'  

const ticketRouter = Router();

ticketRouter.get('/', getTickets);
ticketRouter.post('/create', putTicket);

export default ticketRouter;
