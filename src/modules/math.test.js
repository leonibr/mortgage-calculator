const math = require('./math');

describe('Tax function tests', () => {
  test('Should be 100 when annualTax is 1200', () => {
    expect(math.tax(1200)).toBe(100);
  });

  test('Should be 40 when annualTax is 480', () => {
    expect(math.tax(480)).toBe(40);
  });
  test('Should be 0 when annualTax is negative number (-120)', () => {
    expect(math.tax(-120)).toBe(0);
  });

  test('Should be 0 when annualTax is 0', () => {
    expect(math.tax(0)).toBe(0);
  });

  test('Should be 0 when annualTax is NaN ("1d000")', () => {
    expect(math.tax('1d000')).toBe(0);
  });
  test('Should be 83.33 when annualTax is 1000', () => {
    expect(math.tax(1000)).toBe(83.33);
  });
});

describe('Insurance function tests', () => {
  test('Should be 100 when annualInsurance is 1200', () => {
    expect(math.insurance(1200)).toBe(100);
  });

  test('Should be 40 when annualInsurance is 480', () => {
    expect(math.insurance(480)).toBe(40);
  });
  test('Should be 0 when annualInsurance is negative number (-120)', () => {
    expect(math.insurance(-120)).toBe(0);
  });
  test('Should be 0 when annualInsurance is 0', () => {
    expect(math.insurance(0)).toBe(0);
  });

  test('Should be 0 when annualInsurance is NaN ("1d000")', () => {
    expect(math.insurance('1d000')).toBe(0);
  });
  test('Should be 25.0 when annualInsurance is 300', () => {
    expect(math.insurance(300)).toBe(25.0);
  });
  test('Should be 8.33 when annualInsurance is 100', () => {
    expect(math.insurance(100)).toBe(8.33);
  });
});

describe('Principle & Interest tests', () => {
  test('Should return 0 when interestRate is NaN', () => {
    expect(math.principal('5t5', 100, 20)).toBe(0);
  });
  test('Should return 0 when interestRate is a negative number', () => {
    expect(math.principal(-5, 100, 20)).toBe(0);
  });
  test('Should return 0 when interestRate is equals to 0', () => {
    expect(math.principal(0, 100, 20)).toBe(0);
  });
  test('Should return 0 when loanAmount is NaN', () => {
    expect(math.principal(1.8, '2y00', 20)).toBe(0);
  });
  test('Should return 0 when loanAmount is a negative number', () => {
    expect(math.principal(1.8, -25000, 20)).toBe(0);
  });
  test('Should return 0 when loanAmount is equals to 0', () => {
    expect(math.principal(1.8, 0, 20)).toBe(0);
  });
  test('Should return 0 when yearsOfMortgage is NaN', () => {
    expect(math.principal(1.8, 400000, '3r0')).toBe(0);
  });
  test('Should return 0 when yearsOfMortgage is a negative number', () => {
    expect(math.principal(1.8, 400000, -30)).toBe(0);
  });
  test('Should return 0 when yearsOfMortgage is equals to 0', () => {
    expect(math.principal(1.8, 400000, 0)).toBe(0);
  });
  test('Should return 1438.79 when interestRate=1.8 loanAmount=400K yearsOfMortage=30', () => {
    expect(math.principal(1.8, 400000, 30)).toBe(1438.79);
  });
});

describe('Monthly payment', () => {
  test('Should be 1547.12 when interestRate=1.8 loanAmount=400K yearsOfMortage=30 annualTax=1000 annualInsurance=300', () => {
    const interest = math.principal(1.8, 400000, 30);
    const tax = math.tax(1000);
    const insurance = math.insurance(300);
    expect(interest + tax + insurance).toBe(1547.12);
  });
});
