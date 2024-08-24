const app = require('./app');

// This hard-coded port is for the purpose of this example.
// In a real-world application, I would use a configuration file to store configuration values.

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
