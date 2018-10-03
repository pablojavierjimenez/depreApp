import { DomElements } from "./DomElements.class";
import { Operations } from "./operations.class";
import BcraUsdService from './bcraUsd.dataservice.class';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyASDbbESfyg8ctv2NGf4PAfhrz72IhDyoI",
  authDomain: "depreapp-886d8.firebaseapp.com",
  databaseURL: "https://depreapp-886d8.firebaseio.com",
  projectId: "depreapp-886d8",
  storageBucket: "depreapp-886d8.appspot.com",
  messagingSenderId: "751567802942"
};
firebase.initializeApp(config);

// var preText = document.getElementById('gettedFromFBDB');
var dbRef = {},
fbdbUsdData =[];
let app = {} || null;
app.el = new DomElements;
dbRef.usdData = firebase.database().ref().child('data');
dbRef.usdData.on('value', (snap) => {
  app.init(snap);
});

app.init = ( snapData ) => {

  fbdbUsdData = snapData.val();
  app.bcraUsdService = new BcraUsdService(fbdbUsdData);
  app.operations = new Operations(app.el, app.bcraUsdService);
  app.el.calculateBtn.addEventListener('click', (algo) => {
    console.log(app.bcraUsdService);
    // app.el.salaryInitialInPesos.innerText = app.el.inputSalary.value || 0;
    // app.el.salaryInitialInDolars.innerText = app.operations.calculateSalaryInitialInDolars(app.el.inputDate.value).toFixed(1);
    // app.el.salaryActual.innerText = app.operations.calculateSalaryFinalInDolars().toFixed(1);

    // app.el.salaryActualinPesos.innerText = app.operations.calculateSalaryFinalInPesos().toFixed(1);
    // app.el.salaryActualinPesosWithOutDevaluation.innerText = app.operations.calculateSalaryFinalInPesosWithoutDevaluation().toFixed(1);

  });
}
