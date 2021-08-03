const fileSys = require('fs');
const { join } = require('path');

const filePath = join (__dirname, 'users.json');

const getUsers = () => {
    const data = fileSys.existsSync(filePath)
        ? fileSys.readFileSync(filePath)
        : []
    
    try{
        return JSON.parse(data)
    } catch(error){
        return []
    }
}

const saveUser = (users) => fileSys.writeFileSync(filePath, JSON.stringify(users, null, '\t'))
 
const userRoute = (app) => {

    // GET on user base
    app.route('/users/:id?')        
        .get((req, res) => {
            const { id, name } = req.body;

            const users = getUsers();

            res.send({ users });
        })

    // Register users on user base
    app.route('/users/register')
        .post((req, res) => {
            const { id, name } = req.body;
            
            const users = getUsers()

            users.push(req.query)
            saveUser(users)

            res.status(201).send('Registered')
        })

    // Edit users on user base
    app.route('/users/:id?/edit')
        .put((req, res) => {
            const name = req.body;
            const id = req.params;

            const users = getUsers();
    
            saveUser(users.map(user => {

                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.query
                    }
                }

                return user
            }))
            res.status(200).send('Edited')
        })

    // Remove users on user base    
    app.route('/users/remove/:id?')
        .delete((req, res) => {
            const name = req.body;

            const users = getUsers();
            
            saveUser(users.filter(({ id }) => id !== req.params.id))

            res.status(200).send('Removed')
        })
}

module.exports = userRoute;