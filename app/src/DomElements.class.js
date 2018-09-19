
export class DomElements {
/**
 * @constructor
 * @param {object} bom reference to a Browser object given by browser
 * @param {objecta} dom reference to a document object given by browser
 * @param {string}domSelector css id for modal container
 * @example Example of implementation:
 *      let modal = new ModalComponent(window, document, '.app_modal__container');
 */
  constructor() {
    // Elements by Id
    this.inputDate = document.getElementById('start_day');
    this.inputSalary = document.getElementById('start_salary');
    this.calculateBtn = document.getElementById('calculate');
    this.salaryInitialinDolars = document.getElementById('salary_start_inDolars');
    this.salaryInitialinPesos = document.getElementById('salary_start_inPesos');
    this.salaryActual = document.getElementById('salary_actual_inDolars');
    this.salaryActualinPesos = document.getElementById('salary_actual_inPesos');
    this.salaryActualinPesosWithOutDevaluation = document.getElementById('salary_actual_inPesos_without_devaluation');
  }
}
