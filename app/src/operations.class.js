export class Operations {

  /**
   *
   * @param {JSON_Object} data
   */
  constructor(domElments, data) {
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

  _calculate_salary_initial_in_dolars(inputDate) {
    let positionId = 'id_' + inputDate.replace(new RegExp('-', 'g'), '');
    let item = this.data.finalData[positionId];
    this.values.dolarValueInitial = item[inputDate];
    this.values.salaryInitialInPesos = this.domElments.inputSalary.value;
    this.values.salaryInitialInDolars = this.values.salaryInitialInPesos / this.values.dolarValueInitial;
    console.log(this.values.salaryInitialInDolars);
    return this.values.salaryInitialInDolars;
  }

  _calculate_salary_final_in_dolars() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getDate();
    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;

    let today = `${year}-${month}-${day}`;
    let positionId = `id_${year}${month}${day}`;
    let lastIncertId = this.data.finalData.lastIncertId;
    let item = {today: 0};

    if ( this.data.finalData[positionId] === undefined) {
      item = this.data.finalData[lastIncertId] ;
      today = Object.keys(item)[0];
    } else {
      item = this.data.finalData[positionId];
    }

    this.values.dolarValuefinal = item[today];
    this.values.salaryInitialInPesos = this.domElments.inputSalary.value;
    this.values.salaryfinalInDolars = this.values.salaryInitialInPesos / this.values.dolarValuefinal;

    return this.values.salaryfinalInDolars;
  }

  _calculate_salary_final_in_pesos() {
    this.values.salaryfinalInPesos = this.values.salaryfinalInDolars * this.values.dolarValueInitial;
    return this.values.salaryfinalInPesos;
  }

  _calculate_salary_final_in_pesos_without_devaluation() {
    this.values.salaryfinalInPesosWithOutDevaluation = this.values.salaryInitialInDolars * this.values.dolarValuefinal;
    return this.values.salaryfinalInPesosWithOutDevaluation;
  }

}
