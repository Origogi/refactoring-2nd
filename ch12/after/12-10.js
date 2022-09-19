// 컴포지션(위임)
class Printer {
  #printHeader;
  constructor(printHeader) {
    this.#printHeader = printHeader;
  }

  print() {
    this.#printHeader ? this.#printHeader.print() : console.log('기본적인 출력!');
  }
}

class RedPrintHeder {
  print() {
    console.log('🔴 출력!');
  }
}

class BlackPrintHeader {
  print() {
    console.log('⚫ 출력!');
  }
}

const printers = [ new Printer(), new Printer(new RedPrintHeder()), new Printer(new BlackPrintHeader())]

printers.forEach(printer => printer.print());