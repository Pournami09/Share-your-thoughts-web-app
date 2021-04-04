document.getElementById('loginScreen').style.display = "block"
document.getElementById('userDataScreen').style.display = "none"

// Get all data from collection 'data'
function showData(){
  let data =[]

    firebase.firestore().collection('data').get().then(docs=>{
        docs.forEach(doc=>{
        // console.log(doc.data().message)
        data.push(doc.data().message)
    })
    // console.log(data)
    for(let i=0; i<data.length; i++){
          document.getElementById('res').innerHTML += `
            <tr>
                <td>${data[i]}</td>
                <td></td>
            </tr>
        
        `
    }
  
    }).catch(e=>{
        console.log('error',e);
    })
}

document.getElementById('loginBtn').addEventListener('click', loginUser)
document.getElementById('logout').addEventListener('click', logout)
// document.getElementById('deleteData').addEventListener('click', deleteData)

//Login with Google
function loginUser(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        document.getElementById('userData').innerHTML = `
        <p>Admin: ${user.displayName}</p>
        `
        document.getElementById('loginScreen').style.display = "none"
        document.getElementById('userDataScreen').style.display = "block"
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
        document.getElementById('loginScreen').style.display = "none"
        document.getElementById('userDataScreen').style.display = "block"
        document.getElementById('logout').style.display = "block"
        document.getElementById('userData').innerHTML = `
        <p>Admin: ${user.displayName}</p>
        `
      // ...
    } else {
        document.getElementById('loginScreen').style.display = "block"
        document.getElementById('userDataScreen').style.display = "none"
        document.getElementById('logout').style.display = "none"
    }
  });

  function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('User Logged Out!');
        document.getElementById('loginScreen').style.display = "none"
        document.getElementById('userDataScreen').style.display = "none"
        
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
  }

 
// // Delete data from table
//   function deleteData(){
//     let docid = ""
//     firebase.firestore().collection("data").doc(docid).delete().then(() => {
//         console.log('Message Removed');
        
//     }).catch(e=>console.log(e))
// }


// deleteData()
showData()