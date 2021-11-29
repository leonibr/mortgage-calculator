const round = (value) => {
  return Math.round(value * 100) / 100;
};

const byMonthRate = (annualTax) => {
  if (isNaN(annualTax)) {
    return 0;
  }
  const aTax = +annualTax;
  if (aTax < 0) {
    return 0;
  }
  const _tax = round(aTax / 12);
  return _tax;
};

const principalInterest = (interestRate, loanAmount, yearsOfMortgage) => {
  if (isNaN(interestRate)) {
    return 0;
  }
  interestRate = +interestRate;
  if (interestRate <= 0) {
    return 0;
  }
  if (isNaN(loanAmount)) {
    return 0;
  }
  loanAmount = +loanAmount;
  if (loanAmount <= 0) {
    return 0;
  }
  if (isNaN(yearsOfMortgage)) {
    return 0;
  }
  yearsOfMortgage = +yearsOfMortgage;
  if (yearsOfMortgage <= 0) {
    return 0;
  }
  const ans = round(
    ((interestRate / 100 / 12) * loanAmount) /
      (1 - Math.pow(1 + interestRate / 100 / 12, -yearsOfMortgage * 12))
  );
  return ans;
};

const tax = byMonthRate;

const insurance = byMonthRate;

module.exports = {
  tax: tax,
  insurance: insurance,
  principalInterest: principalInterest,
};
