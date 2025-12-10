// utils/formatters.js

// utils/formatters.js
export const formatarPrecoParaNumero = (preco) => {
  if (typeof preco === 'number') return preco;
  if (typeof preco === 'string') {
    console.log("String original recebida para formatação:", preco);
    
    // Remove qualquer símbolo de moeda (R$, $, etc.) e espaços
    let limpo = preco
      .replace(/[R$\s]/g, '') // Remove R$, $ e espaços
      .trim();
    
    console.log("Após remover símbolos:", limpo);
    
    // Verifica se tem ponto como separador decimal (formato americano)
    if (limpo.includes('.') && !limpo.includes(',')) {
      // Formato americano: "25.00"
      const numero = parseFloat(limpo);
      console.log("Convertido de formato americano:", numero);
      return isNaN(numero) ? 0 : numero;
    }
    
    // Formato brasileiro: "25,00" ou "1.250,50"
    // Remove pontos que separam milhares
    limpo = limpo.replace(/\./g, '');
    // Substitui vírgula por ponto para parseFloat
    limpo = limpo.replace(',', '.');
    
    const numero = parseFloat(limpo);
    console.log("Convertido de formato brasileiro:", numero);
    return isNaN(numero) ? 0 : numero;
  }
  return 0;
};

export const formatarParaMoedaBrasileira = (valor) => {
  let numero;
  if (typeof valor === 'string') {
    // Remove caracteres não numéricos, mantém apenas números, ponto e vírgula
    const limpo = valor.replace(/[^\d,.-]/g, '');
    // Converte para número
    if (limpo.includes(',')) {
      // Formato brasileiro
      numero = parseFloat(limpo.replace(/\./g, '').replace(',', '.'));
    } else {
      // Formato americano ou número puro
      numero = parseFloat(limpo);
    }
  } else {
    numero = Number(valor);
  }
  
  if (isNaN(numero)) numero = 0;
  
  return numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};