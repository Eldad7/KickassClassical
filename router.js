/**
 * Created by gadyezra on 6/20/17.
 */

var main = require('./controller');

app.get('/', function(req,res) {
    res.redirect('/app/First');
});

app.get('/api', function(req,res) {
    res.redirect('/apidoc');
});

app.post('/addNewUser',main.addNewUser);

app.post('/verifyTok',main.verifyTok);

app.get('/getUserById/:id',main.getUserById);

app.post('/likeComposition',main.likeComposition);

app.post('/addNewMixtape',main.addNewMixtape);

app.get('/getAllMixtapes',main.getAllMixtapes);

app.get('/getMixtapeById/:id',main.getMixtapeById);

app.post('/getMixtapesFiltered',main.getMixtapesFiltered);

app.post('/addNewCompisition',main.addNewComposition);

app.get('/getCompositionById/:id',main.getCompositionById);

app.post('/getCompositionsByIds',main.getCompositionsByIds);

// app.all('*', function(req,res,next) {
//     console.log("Request Recieved");
//     res.send('404 NO REQUEST FOUND');
// });