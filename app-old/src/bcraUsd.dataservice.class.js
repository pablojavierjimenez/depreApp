export default class BcraUsd {
  constructor( mokedData ) {
    this.mokedData = mokedData || [];
    this.data = {
      fromServer: this._getDataFromServer(),
      fromLocalStorage: this._getDataFromLocalStorage(),
      finalData: this._getFinalDataFromLocalStorage()
    }
    return this.data;
  }

  _getDataFromServer() {
    var date = new Date();
    var dateDiference = (date.getTime() - JSON.parse(localStorage.getItem('lastUpdateDataFromServer'))) > 86400000;
    /**
     * si aun no existe la variable en local storage,
     * o paso mas de un dia ( dateDiference )
     * llama al servicio, sino lo trae de el json en local storage
     */
    if (localStorage.getItem('originalDataFromServer') === null || dateDiference) {
      fetch('http://localhost:3000/sites/bnaDolarData/').then(response => {
        response.json().then(jsonData => {
          // console.log( 'jsonData', jsonData );
          localStorage.setItem('lastUpdateDataFromServer', date.getTime());
          localStorage.setItem('originalDataFromServer', JSON.stringify( jsonData ) );
          localStorage.setItem('finalDataFromLocalStorage', JSON.stringify( this._getFinalDataFromLocalStorage( jsonData ) ) );
        })
        .catch(function(error) {
          console.log('Hubo un problema con la petición response:' + error.message);
        });
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
    }
    return JSON.parse( localStorage.getItem('originalDataFromServer') );
  }

  _getDataFromLocalStorage() {
    var date = new Date();

    var dateDiference = (date.getTime() - JSON.parse(localStorage.getItem('lastUpdateDataFromServer'))) > 86400000;

    if (localStorage.getItem('originalDataFromServer') === null || dateDiference) {
      // get data grom server
      // var data = app.methods.getDataFromServer();
      fetch('http://localhost:3000/sites/bnaDolarData/').then(response => {
        response.json().then(jsonData => {
          console.log('gettedData');
          localStorage.setItem('originalDataFromServer', JSON.stringify(jsonData));
          localStorage.setItem('lastUpdateDataFromServer', date.getTime());
          localStorage.setItem('finalDataFromLocalStorage', this._getFinalDataFromLocalStorage() );
        });
      });
    }
    return JSON.parse(localStorage.getItem('originalDataFromServer'));
  }

  _getFinalDataFromLocalStorage( jsonData ) {

    var data = JSON.parse(localStorage.getItem('originalDataFromServer')) || jsonData;
    let finalData = JSON.parse(localStorage.getItem('finalDataFromLocalStorage'));

    if ( finalData === null ) {
      finalData = this._recreatData(data) ;
      localStorage.setItem('finalDataFromLocalStorage', JSON.stringify( finalData));
    }

    return finalData;
  }

  _recreatData(originalArrayData) {
    let dataToBeReturned = {};
    dataToBeReturned.lastIncertId = '';
    originalArrayData.map((item) => {
      var itemId = 'id_' + item.d.replace(new RegExp('-', 'g'), '');
      dataToBeReturned.lastIncertId = itemId;
      var newItem = {};
      newItem[item.d] = item.v;
      dataToBeReturned[itemId] = newItem;
    });
    return dataToBeReturned;
  }
}
