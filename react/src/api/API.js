const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            credentials:'include',
            'Content-Type': 'application/json'
        },
            data : {
                "username" : payload.username,
                "password" : payload.password
            },
        body: JSON.stringify(payload)})
        .then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const deleteIt = (param) =>
    fetch(`${api}/users/deleteIt?fileName=`+param, {
        method: 'POST'
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const toggleStar = (payload) =>
    fetch(`${api}/users/toggleStar`, {
        method: 'POST',
        headers: {
            ...headers,
            credentials:'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignUp = (payload) =>
    fetch(`${api}/users/doSignUp`, {
        method: 'POST',
        headers: {
            ...headers,
            credentials:'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/users/logout`, {

    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getImages = () =>
    fetch(`${api}/users/files`)
        .then(res => {
            //console.log("response"+res.body);
            return res.json();
        })
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const getSharedFiles = () =>
    fetch(`${api}/users/sharedfiles`)
        .then(res =>   res.json())
        .catch(error => {
            console.log("This is error."+error);
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/users/upload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const uploadFileUnderDir = (payload,dirPath) =>
    fetch(`${api}/users/uploadUnderDir?dirPath=`+dirPath, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getFilesUnderDir = (payload,dirPath) =>
    fetch(`${api}/users/getfilesUnderDir?dirPath=`+dirPath, {
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const shareDirectory = (payload) =>
    fetch(`${api}/users/shareDirectory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doMakeDir = (payload) =>
    fetch(`${api}/users/makedir`, {
        method: 'POST',
        headers: {
            ...headers,
            credentials:'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
//
// export const doCreateGroup = (payload) =>
//     fetch(`${api}/users/creategroup`, {
//         method: 'POST',
//         headers: {
//             ...headers,
//             credentials:'include',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     }).then(res => {
//         return res.status;
//     })
//         .catch(error => {
//             console.log("This is error");
//             return error;
//         });

export const setLoggedInUser = (username) =>
fetch(`${api}/users/setLoggedInUser?username=`+username,{
}).then(res => {
    return res.status;
}).catch(error => {
    console.log("This is error");
    return error;
});