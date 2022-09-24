export function createStatememt(invoice, plays) {
    const result = {};

    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result.performances);
    result.totalCredits = totalCredits(result.performances);

    return result;

    function totalAmount(performances) {
      return performances.reduce((sum, perf) => perf.amount + sum, 0);
    }
  
    function totalCredits(performances) {
      return performances.map((perf) => perf.credits).reduce((a, b) => a + b, 0);
    }
  
    function enrichPerformance(performance) {
      const result = { ...performance };
  
      result.play = playFor(performance)
      result.amount = amountFor(result);
      result.credits = creditsFor(result);
  
      return result;
    }
  
    function playFor(performance) {
      return plays[performance.playID];
    }
  
    function amountFor(performance) {
      let thisAmount = 0;
      switch (performance.play.type) {
        case 'tragedy': // 비극
          thisAmount = 40000;
          if (performance.audience > 30) {
            thisAmount += 1000 * (performance.audience - 30);
          }
          break;
        case 'comedy': // 희극
          thisAmount = 30000;
          if (performance.audience > 20) {
            thisAmount += 10000 + 500 * (performance.audience - 20);
          }
          thisAmount += 300 * performance.audience;
          break;
        default:
          throw new Error(`알 수 없는 장르: ${play.type}`);
      }
      return thisAmount;
    }
  
    function creditsFor(performance) {
      let result = Math.max(performance.audience - 30, 0);
      // 희극 관객 5명마다 추가 포인트를 제공한다.
      if ('comedy' === performance.play.type) {
        result += Math.floor(performance.audience / 5);
      }
      return result;
    }
  }