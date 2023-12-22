module.exports = {
    checkAdmin: (req, res, next) => {
        if(req.cookies.admin){
            next()
        }else{
            res.redirect('/login')
        }
    },
    checkLogin: (req, res, next)=>{
        if(req.cookies.admin){
            res.redirect('/')
        }else{
            next()
        }
    }
}