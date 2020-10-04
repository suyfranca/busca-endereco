(function (document) {
  'use strict';

  const $inputCep = document.querySelector('[data-js="input-cep"]');
  const $button = document.querySelector('[data-js="btn"]');
  const $status = document.querySelector('[data-js="status"]');
  const $cepInfo = document.querySelector('[data-js="cep-info"]');

  const $logradouro = document.querySelector('[data-js="logradouro"]');
  const $bairro = document.querySelector('[data-js="bairro"]');
  const $estado = document.querySelector('[data-js="estado"]');
  const $cidade = document.querySelector('[data-js="cidade"]');
  const $cep = document.querySelector('[data-js="cep"]');

  $button.addEventListener('click', searchCep, false);
  $inputCep.focus();

  function searchCep(e) {
    e.preventDefault();
    if ($inputCep.value == '') return getMessage('warning');
    let url = getUrl();
    const cep = fetch(url);
    getMessage('loading');
    cep
      .then((r) => r.json())
      .then((data) => {
        if (data === undefined || data.erro === true) {
          return errorPage(data);
        }
        fillForm(data);
      })
      .catch((error) => errorPage());
  }

  function errorPage() {
    if ($cepInfo.firstElementChild) {
      cleanField();
    }
    getMessage('error');
  }

  function getUrl() {
    return `https://viacep.com.br/ws/${clearCEP()}/json/`;
  }

  function clearCEP() {
    let cepCleaned = $inputCep.value.replace(/\D/g, '');
    return cepCleaned;
  }

  function fillForm(data) {
    if (data.erro) {
      return getMessage('error');
    }
    $cepInfo.style.display = 'block';
    getMessage('ok');
    $logradouro.textContent = data.logradouro;
    $bairro.textContent = data.bairro;
    $estado.textContent = data.uf;
    $cidade.textContent = data.localidade;
    $cep.textContent = data.cep;
  }

  function cleanField() {
    $cepInfo.style.display = 'none';
  }

  function getMessage(type) {
    let cep = clearCEP();
    let messages = {
      loading: `Buscando informações para o CEP ${cep}...`,
      ok: `Endereço referente ao CEP ${cep}:`,
      error: `Não encontramos endereço para o CEP ${cep}.`,
      warning: 'Digite um CEP',
    };
    $status.textContent = messages[type];
    return messages[type];
  }
})(document);
