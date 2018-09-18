
export default class BcraUsd {
  constructor(){
    this.data = {
      fromServer: this._getDataFromServer(),
      fromLocalStorage: this._getDataFromLocalStorage(),
      finalData: this._getFinalDataFromLocalStorage()
    }
    return this.data;
  }

  _getDataFromServer () {
    var date = new Date();
    var dateDiference = (date.getTime() - JSON.parse(localStorage.getItem('lastUpdateDataFromServer'))) > 86400000;
    /**
     * si aun no existe la variable en local storage,
     * o paso mas de un dia ( dateDiference )
     * llama al servicio, sino lo trae de el json en local storage
     */
    if ( localStorage.getItem('originalDataFromServer') === null || dateDiference ) {
      fetch('http://localhost:3000/sites/bnaDolarData/').then( response => {
        response.json().then( jsonData => {
          // console.log( 'jsonData', jsonData );
          localStorage.setItem( 'originalDataFromServer', JSON.stringify( jsonData ) );
          localStorage.setItem( 'lastUpdateDataFromServer', date.getTime() );
        });
      });
    }
    return JSON.parse(localStorage.getItem('originalDataFromServer'));
  }

  _getDataFromLocalStorage () {
    var date = new Date();

    var dateDiference = ( date.getTime() - JSON.parse( localStorage.getItem('lastUpdateDataFromServer') ) ) > 86400000;

    if ( localStorage.getItem('originalDataFromServer') === null ||  dateDiference ) {
      // get data grom server
      // var data = app.methods.getDataFromServer();
      fetch('http://localhost:3000/sites/bnaDolarData/').then( response => {
        response.json().then(jsonData => {
          console.log('gettedData');
          localStorage.setItem('originalDataFromServer', JSON.stringify(jsonData));
          localStorage.setItem('lastUpdateDataFromServer', date.getTime());
        });
      });
    }
    return JSON.parse(localStorage.getItem('originalDataFromServer'));
  }

  _getFinalDataFromLocalStorage () {
    var finalData = JSON.parse( localStorage.getItem('finalDataFromLocalStorage') );

    if ( localStorage.getItem('finalDataFromLocalStorage') === null ) {

      var data = JSON.parse( localStorage.getItem('originalDataFromServer') );
      finalData = this._recreatData ( localStorage.getItem('finalDataFromLocalStorage'), data);
      localStorage.setItem( 'finalDataFromLocalStorage', JSON.stringify( finalData ) );
    }
    return finalData;
  }

  _recreatData ( newDataFormat, arrData ) {
    if (newDataFormat === null) {
      var newDataFormat = new Array();

      arrData.map((item) => {
        var itemId = item.d.replace(new RegExp('-', 'g'), '');
        var newItem ={};
        newItem[item.d] = item.v;
        newDataFormat[itemId] = newItem;
      });
    }
    return newDataFormat;
  }
}
