document.getElementById('shareBtn').addEventListener('click', addData)

function addData(){
    let myMessage = document.getElementById('msg').value

    let dataToAdd = {
        message: myMessage
    }

    firebase.firestore().collection('data').add(dataToAdd).then(res=>{
        alert('Data Added')
    }).catch(e=>{
        console.log('Error');
    })
    console.log(myMessage);
}