



import { DomElements } from "./DomElements.class";


let app = {} || null;
app.el = new DomElements;
app.methods = new Operations;
console.log(app.el);
//   app.values = {
//     dolarValueInitial: 0,
//     dolarValuefinal: 0,
//     salaryInitialInPesos: 0,
//     salaryInitialInDolars: 0,
//     salaryfinalInPesos: 0,
//     salaryfinalInPesosWithOutDevaluation: 0,
//     salaryfinalInDolars: 0
//   };

app.methods = {
  calculate_salary_initial_in_dolars: ( inputDate ) => {
    app.values.dolarValueInitial = app.data.finalData[inputDate];
    app.values.salaryInitialInPesos = app.el.inputSalary.value;
    app.values.salaryInitialInDolars = app.values.salaryInitialInPesos / app.values.dolarValueInitial;
    return app.values.salaryInitialInDolars;
  },
  calculate_salary_final_in_dolars: () => {
    var date = new Date();
    var month = date.getUTCMonth() + 1;
    var day = date.getDate();
    month = (month < 10 ) ? '0'+month : month;
    day = (day < 10 ) ? '0'+day : day;
    var today = `${date.getFullYear()}-${month}-${day}`;

    app.values.dolarValuefinal = app.data.finalData[today]
    app.values.salaryInitialInPesos = app.el.inputSalary.value;
    app.values.salaryfinalInDolars = app.values.salaryInitialInPesos / app.values.dolarValuefinal;
    return app.values.salaryfinalInDolars;
  },
  calculate_salary_final_in_pesos: () => {
    app.values.salaryfinalInPesos = app.values.salaryfinalInDolars * app.values.dolarValueInitial;
    return app.values.salaryfinalInPesos;
  },
  calculate_salary_final_in_pesos_without_devaluation: () => {
    app.values.salaryfinalInPesosWithOutDevaluation = app.values.salaryInitialInDolars * app.values.dolarValuefinal;
    return app.values.salaryfinalInPesosWithOutDevaluation;
  },
  recreatData: (newDataFormat, arrData) => {
    if ( newDataFormat === null ) {
      newDataFormat = {};
          arrData.map( (item) => {
        newDataFormat[item.d] = item.v;
          });
      }

    return newDataFormat;
  },
  getDataFromServer: () => {

    var date = new Date();
    var dateDiference = (date.getTime() - JSON.parse(localStorage.getItem('lastUpdateDataFromServer'))) > 86400000;

    /**
     * si aun no existe la variable en local storage,
     * o paso mas de un dia ( dateDiference )
     * llama al servicio, sino lo trae de el json en local storage
     */
    if ( localStorage.getItem('originalDataFromServer') === null || dateDiference ) {
      // get data grom server
      // var data = app.methods.getDataFromServer();
      fetch('http://localhost:3000/sites/bnaDolarData/').then(response => {
        response.json().then( jsonData => {
          console.log(' jsonData', jsonData);
          localStorage.setItem('originalDataFromServer', JSON.stringify(jsonData));
          localStorage.setItem('lastUpdateDataFromServer', date.getTime());
        });
      });
    }
    return JSON.parse(localStorage.getItem('originalDataFromServer'));

    return gettedData;
  },
  getDataFromLocalStorage: () => {
    var date = new Date();
    var dateDiference = ( date.getTime() - JSON.parse( localStorage.getItem('lastUpdateDataFromServer') ) ) > 86400000;
    if ( localStorage.getItem('originalDataFromServer') === null ||  dateDiference ) {
      // get data grom server
      // var data = app.methods.getDataFromServer();
      fetch('http://localhost:3000/sites/bnaDolarData/').then(response => {
        response.json().then(jsonData => {
          console.log('gettedData');
          localStorage.setItem('originalDataFromServer', JSON.stringify(jsonData));
          localStorage.setItem('lastUpdateDataFromServer', date.getTime());
        });
      });
    }
    return JSON.parse(localStorage.getItem('originalDataFromServer'));
  },
  getFinalDataFromLocalStorage: () => {
    var finalData = JSON.parse( localStorage.getItem('finalDataFromLocalStorage') );
    if ( localStorage.getItem('finalDataFromLocalStorage') === null ) {
      var data = JSON.parse( localStorage.getItem('originalDataFromServer') );
      finalData = app.methods.recreatData( localStorage.getItem('finalDataFromLocalStorage'), data);
      localStorage.setItem( 'finalDataFromLocalStorage', JSON.stringify( finalData ) );
    }
    return finalData;
  }
};

// app.data = {
//   fromLocalStorage : app.methods.getDataFromLocalStorage(),
//   fromServer : app.methods.getDataFromServer(),
//   finalData: app.methods.getFinalDataFromLocalStorage()
// };

// app.el.calculateBtn.addEventListener('click', (algo) => {
//   app.el.salaryInitial.innerText = app.methods.calculate_salary_initial_in_dolars(app.el.inputDate.value).toFixed(4);
//   app.el.salaryActual.innerText = app.methods.calculate_salary_final_in_dolars().toFixed(4);
//   app.el.salaryActualinPesos.innerText = app.methods.calculate_salary_final_in_pesos().toFixed(4);
//   app.el.salaryActualinPesosWithOutDevaluation.innerText = app.methods.calculate_salary_final_in_pesos_without_devaluation().toFixed(4);
// });

