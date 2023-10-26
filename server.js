import jsonServer from 'json-server';
const { create, defaults } = jsonServer;
const server = create();
const router = jsonServer.router('./db/db.json'); // Reemplaza 'db.json' con la ubicación de tu archivo JSON de datos
const middlewares = defaults();

const port = 3005; // Puedes cambiar el número de puerto según tus necesidades

server.use(middlewares);


function isAuthorized(req, res, next) {
  const token = req.headers.authorization;
  const userId = req.headers['user-id']

  if (token) {
    const persons = router.db.get('persons').value();
    const current = persons.find((person) => { return person.id === userId })
    console.log(current.accces_jit, token)
    if (token.includes(current.accces_jit)) {
      return true
    } else {
      return false
    }
  }

  return true
}

server.use((req, res, next) => {

  if (isAuthorized(req)) { // add your authorization logic here
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
})
// Endpoint personalizado para realizar la búsqueda
server.get('/projects', (req, res) => {
  const ownerId = req.query['owner.id'];

  if (ownerId) {
    const projects = router.db.get('projects').value();
    const filteredProjects = projects.filter((project) => {
      const teamMembers = project.teamMembers || [];
      const ownerInTeamMembers = teamMembers.some((member) => member.id === ownerId);
      return project.owner.id === ownerId || ownerInTeamMembers;
    });

    res.json(filteredProjects);
  }
});

server.get('/projects/:id', (req, res) => {
  const userId = req.headers['user-id']
  const projectId = parseInt(req.params.id);


  if (userId) {

    const projects = router.db.get('projects').value();
    const filteredProject = projects.find((project) => {
    
      return project.id === projectId
    });
    if (filteredProject) {

      const teamMembers = filteredProject.teamMembers || [];
      const ownerInTeamMembers = teamMembers.some((member) => member.id === userId);
      if (ownerInTeamMembers || filteredProject.owner.id === userId) {
        res.json(filteredProject);
      } else {
        res.sendStatus(403)
      }
    }else{
      res.sendStatus(404)
    }

  }
});





server.use(router);

server.listen(port, () => {
  console.log(`JSON Server está corriendo en http://localhost:${port}`);
});

