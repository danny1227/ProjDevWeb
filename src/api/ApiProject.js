const express = require('express');
const cors = require('cors');
const User = require('./User'); // Ajusta la ruta según la ubicación del archivo

const app = express();

app.use(express.json());
app.use(cors());


let users = [
    new User('123','1234', 'Juan', 'juan@gmail.com','20001227','123')
];

// Endpoint para crear un nuevo usuario (POST /users)
app.post('/users', (req, res) => {
    const { member, dpi, username, email, birthdate,password } = req.body;
    console.log('*********** metoto login');
    console.log(dpi, username, email, password );

    // Validar que el correo electrónico no exista ya en el sistema
    const userExists = users.find(user => user.email === email);
    console.log('existe',userExists);
    if (userExists) {
        return res.status(200).json({ message: 'El correo electrónico ya está registrado.' });
    }else{
    // Agregar nuevo usuario
        
        const newUser = {member, dpi, username, email, birthdate,password };
              users.push(newUser);
              
        return res.status(201).json({ message: 'Usuario creado exitosamente' }); 
    }
});

// Ruta de login
app.post('/login', (req, res) => {
    const { dpi, password } = req.body;

    // Validar si el usuario existe y la contraseña es correcta
     const user = users.find(user => user.dpi === dpi && user.password === password);

    if (!user) {
        return res.status(200).json({ message: 'Correo electrónico o contraseña incorrecta' });
    }

    // Login exitoso
    res.status(201).json({ message: 'Login exitoso'});
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});