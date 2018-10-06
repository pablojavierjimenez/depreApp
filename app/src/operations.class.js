
export class Operations {

  /**
   *
   * @param {JSON_Object} data
   */
  constructor ( domElments, data ) {
    this.domElments = domElments;
    this.data = data;

    this.values = {
      dolarValueInitial: 0,
      dolarValuefinal: 0,
      salaryInitialInPesos: 0,
      salaryInitialInDolars: 0,
      salaryfinalInPesos: 0,
      salaryfinalInPesosWithOutDevaluation: 0,
      salaryfinalInDolars: 0
    };

    this.calculateSalaryInitialInDolars = this._calculate_salary_initial_in_dolars;
    this.calculateSalaryFinalInDolars = this._calculate_salary_final_in_dolars;

    this.calculateSalaryFinalInPesos = this._calculate_salary_final_in_pesos;
    this.calculateSalaryFinalInPesosWithoutDevaluation = this._calculate_salary_final_in_pesos_without_devaluation;
  }

  _calculate_salary_initial_in_dolars (inputDate) {

    this.values.dolarValueInitial = this.data.finalData[inputDate];
    this.values.salaryInitialInPesos = this.domElments.inputSalary.value;
    this.values.salaryInitialInDolars = this.values.salaryInitialInPesos / this.values.dolarValueInitial;
    return this.values.salaryInitialInDolars;
  }

  _calculate_salary_final_in_dolars () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getDate();
    month = (month < 10 ) ? '0'+month : month;
    day = (day < 10 ) ? '0'+day : day;

    let today = `${year}-${month}-${day}`;
    this.values.dolarValuefinal = this.data.finalData[today]
    this.values.salaryInitialInPesos = this.domElments.inputSalary.value;
    this.values.salaryfinalInDolars = this.values.salaryInitialInPesos / this.values.dolarValuefinal;

    return this.values.salaryfinalInDolars;
  }

  _calculate_salary_final_in_pesos () {
    this.values.salaryfinalInPesos = this.values.salaryfinalInDolars * this.values.dolarValueInitial;
    return this.values.salaryfinalInPesos;
  }

  _calculate_salary_final_in_pesos_without_devaluation () {
    this.values.salaryfinalInPesosWithOutDevaluation = this.values.salaryInitialInDolars * this.values.dolarValuefinal;
    return this.values.salaryfinalInPesosWithOutDevaluation;
  }

  _helpers(){
    // los pongo aca para que no rompan nada mas
    // (newDataFormat[20180905] != undefined ) ? newDataFormat[20180905] : newDataFormat[newDataFormat.length -1 ];
    // _recreatData ( newDataFormat, arrData ) {
    //   if (newDataFormat === null) {
    //     var newDataFormat = new Array();

    //     arrData.map((item) => {
    //       var itemId = item.d.replace(new RegExp('-', 'g'), '');
    //       var newItem ={};
    //       newItem[item.d] = item.v;
    //       newDataFormat[itemId] = newItem;
    //     });
    //   }
    //   return newDataFormat;
    // }
  }
}
