const mongoose = require("mongoose");
const Client = require("../models/client")


export const get = async (id) => {
    try {
        // User check 
        let client = await Client.findById(id)
        if(!client) throw new Error('Client not found') 
        return client
    } catch (err) {
        throw new Error(err)
    }
}

export const login = async ({email, password}) => {
    try {
        // User check only restaurant can get
        // let addUser = await axios call from c#
        // return user object from axios response 
        return true
    } catch (err) {
        throw new Error(err)
    }
}

export const register = async (credentialId, {name, lastName, phoneNumber, address}) => {
    try {
        // User check 

        let clientCheck = await Client.findById(credentialId)
        if(clientCheck)  throw new Error('Client already exist')

        let client = await new Client({
            credentialsId: credentialsId,
            name : name,
            lastName : lastName,
            phoneNumber : phoneNumber,
            address : address
        })

        await client.save()
        return client
    } catch (err) {
        throw new Error(err)
    }
}


export const update = async (id, { name, lastName, phoneNumber, address }) => {
    try {
        let client = await Client.findById(id)
        if (!client) throw new Error('client does not exist ! ')

        client.name = name
        client.lastName = lastName
        client.phoneNumber = phoneNumber
        client.address = address

        client = await client.save()

        return client
    } catch (err) {
        throw new Error(err)
    }
}

export const remove = async (id) => {
    try {
        let article = await Article.findById(Id)
        if (!article) throw new Error('Article does not exist ! ')

        await Article.findByIdAndRemove(id)
        // or make private: true
        return true
    } catch (err) {
        throw new Error(err)
    }
}