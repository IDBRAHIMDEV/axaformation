
async function run() {
    const user = await getUser(1);
    console.log('result user: ', user);
}

run();


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