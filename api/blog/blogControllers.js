exports.blogHome = async function(req,res){
        const name = req.body.name;
        res.send(`<h3>Home For Harsha Blog ${name} </h3>`);
}
