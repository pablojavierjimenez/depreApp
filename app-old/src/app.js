import { MokedData } from "./mokedData";
import { DomElements } from "./DomElements.class";
import { Operations } from "./operations.class";
import BcraUsdService from './bcraUsd.dataservice.class';

let app = {} || null;
app.el = new DomElements;
app.bcraUsdService = new BcraUsdService( new MokedData() );
app.operations = new Operations(app.el, app.bcraUsdService);

console.log(app);

app.el.calculateBtn.addEventListener('click', (algo) => {
  app.el.salaryInitialInPesos.innerText = app.el.inputSalary.value || 0;
  app.el.salaryInitialInDolars.innerText = app.operations.calculateSalaryInitialInDolars(app.el.inputDate.value).toFixed(1);
  app.el.salaryActual.innerText = app.operations.calculateSalaryFinalInDolars().toFixed(1);

  app.el.salaryActualinPesos.innerText = app.operations.calculateSalaryFinalInPesos().toFixed(1);
  app.el.salaryActualinPesosWithOutDevaluation.innerText = app.operations.calculateSalaryFinalInPesosWithoutDevaluation().toFixed(1);

});
