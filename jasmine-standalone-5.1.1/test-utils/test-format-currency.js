import { formatCurrency } from "../../scripts/utils/money.js"

describe('test suite: formatCurrency function', () => {
  it('convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('round up a decimal', () => {
    expect(formatCurrency(2001.05)).toEqual('20.01');
  });

  it('round down a decimal', () => {
    expect(formatCurrency(2001.04)).toEqual('20.01');
  });
});