const app = require("./src/app");

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => console.log('listening on port http://localhost:' + PORT))

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0)
    })
})
