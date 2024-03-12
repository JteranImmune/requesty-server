module.exports = (app) => {
    app.use((_req, res) => {
        res.status(404).json({message: 'This route was Not Found'})
    });

    app.use((err, req, res, _next)=>{
        console.log('Error Handler', req.method, req.path, err);

        if(!res.headerSent) {
            res
                .status(500)
                .json({
                    message: "Internal Server Error",
                });
            }
        });
    };