
console.log('before');

getUser(12, (user) => {
    console.log(user);
    getRepos(user.id, (repos) => {
        console.log(repos)
    });
    
});

console.log('after');


function getUser(id, callback) {

    setTimeout(() => {
        console.log('get user from database....');
        callback({ id: id, githubUsername: "idbrahimdev" })
    }, 2000);

}


function getRepos(id, callback) {

    setTimeout(() => {
       console.log('repos of current user');
       callback(['repo1', 'repo2', 'repo3']);
    }, 2000)

}