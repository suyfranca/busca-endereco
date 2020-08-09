(function (document) {
  'use strict';

  const $inputCep = document.querySelector('[data-js="input-cep"]');
  const $button = document.querySelector('[data-js="btn"]');
  const $status = document.querySelector('[data-js="status"]');

  const $span = document.getElementsByTagName('span');
  const $logradouro = document.querySelector('[data-js="logradouro"]');
  const $bairro = document.querySelector('[data-js="bairro"]');
  const $estado = document.querySelector('[data-js="estado"]');
  const $cidade = document.querySelector('[data-js="cidade"]');
  const $cep = document.querySelector('[data-js="cep"]');

  $button.addEventListener('click', searchCep, false);

  function searchCep(e) {
    e.preventDefault();
    if ($inputCep.value == '') return getMessage('warning');
    let url = getUrl();
    const cep = fetch(url);
    cep
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        fillForm(data);
      });
    getMessage('loading');
  }

  function getUrl() {
    return `https://viacep.com.br/ws/${clearCEP()}/json/`;
  }

  function clearCEP() {
    let cepCleaned = $inputCep.value.replace(/\D/g, '');
    console.log(cepCleaned);
    return cepCleaned;
  }

  function fillForm(data) {
    if (data.erro) {
      return getMessage(error);
    }
    cleanField();
    getMessage('ok');
    $logradouro.textContent = data.logradouro;
    $bairro.textContent = data.bairro;
    $estado.textContent = data.uf;
    $cidade.textContent = data.localidade;
    $cep.textContent = data.cep;
  }

  function cleanField() {
    Array.prototype.forEach.call($span, function (item) {
      item.textContent = '';
    });
  }

  function getMessage(type) {
    let cep = clearCEP();
    let messages = {
      loading: `Buscando informações para o CEP ${cep}...`,
      ok: `Endereço referente ao CEP ${cep}:`,
      error: `Não encontramos o endereço para o CEP ${cep}.`,
      warning: 'Digite um CEP',
    };
    $status.textContent = messages[type];
    return messages[type];
  }
})(document);
