const Commande = require("../models/commande")

export const create = async ({ restaurantId, clientId, paymentMethod, date }) => {
    try {
        let commande = await new Commande({
            restaurantId: restaurantId,
            clientId: clientId,
            paymentMethod: paymentMethod,
            date: date
        })

        await commande.save()
        return true

    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
}

export const update = async (id, {paymentMethod, date }) => {
    try {
        let commande = await Commande.findById(id)
        if (!commande) throw new Error('commande does not exist ! ')

        // Update by collection by client 
        
        return client

    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
}

