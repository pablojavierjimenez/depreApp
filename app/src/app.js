
import { DomElements } from "./DomElements.class";
import { Operations } from "./operations.class";
import BcraUsdService from './bcraUsd.dataservice.class';

let app = {} || null;
app.el = new DomElements;
app.bcraUsdService = new BcraUsdService();
app.operations = new Operations(app.el, app.bcraUsdService);

console.log(app);

app.el.calculateBtn.addEventListener('click', (algo) => {

  app.el.salaryInitial.innerText = app.operations.calculateSalaryInitialInDolars(app.el.inputDate.value).toFixed(4);
  app.el.salaryActual.innerText = app.operations.calculateSalaryFinalInDolars().toFixed(4);

  app.el.salaryActualinPesos.innerText = app.operations.calculateSalaryFinalInPesos().toFixed(4);
  app.el.salaryActualinPesosWithOutDevaluation.innerText = app.operations.calculateSalaryFinalInPesosWithoutDevaluation().toFixed(4);

  console.log('hola changos', app.el.inputDate.value);
});

