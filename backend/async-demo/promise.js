
//Déclaration du promise
 const p = new Promise((resolve, reject) => {
    const status = false;
    if(status) {
       
        resolve({ id: 1, name: 'Mohamed IDBRAHIM' });
    }
    else {
        reject(new Error('user not found ...'))
    }
 });

//Consommation du promise
 p
  .then((user) => console.log(user))
  .catch((err) => console.error(err.message));


function getUser(id) {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('get user from database....');
            resolve({ id: id, githubUsername: "idbrahimdev" });
            //reject(new Error('user function'));
        }, 2000);

    }) 
}


function getRepos(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log('repos of current user');
            resolve(['repo1', 'repo2', 'repo3']);
            //reject(new Error('error repos'));
        }, 2000)
    })
}


function getCommit(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log('commits of current repo');
            resolve(['commit1', 'commit2', 'commit3']);
            //reject(new Error('error repos'));
        }, 2000)
    })
}



getUser(1).then((user) => {
    console.log(user);
    return getRepos(user.id);
})
.then((repos) => {
    console.log(repos);
    return getCommit(1);
})
.then((commits) => {
    console.log(commits)
})
.catch((error) => console.error(error.message));

