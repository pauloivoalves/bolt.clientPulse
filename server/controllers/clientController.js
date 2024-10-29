import Client from '../models/Client.js';

export const createClient = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { company, name, role, context, email, phone } = req.body;
    const client = new Client({
      company,
      name,
      role,
      context,  
      email,
      phone,
      user: req.user.id // This will come from auth middleware
    });

    console.log('Client before save:', client);
    await client.save();
    console.log('Client after save:', client);

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user.id });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    const { company, name, role, context, email, phone } = req.body;
    
    console.log('Update data being sent:', { company, name, role, context, email, phone });
    
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { company, name, role, context, email, phone },
      { new: true }
    );
    
    console.log('Updated client:', client);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};
