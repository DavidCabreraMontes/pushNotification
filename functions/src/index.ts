import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);

exports.notificationNewPokemon = functions.database
.ref("{pushID}").onCreate((snapshot, context) =>{
    const payload ={
        notification:{
            title: "POKEMON",
            body: "Se ha creado " + snapshot.val().name
        },
        topic: 'pokemon'
    };
    return admin.messaging().send(payload);
})