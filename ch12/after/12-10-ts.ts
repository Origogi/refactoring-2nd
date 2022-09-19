// 컴포지션(위임)
class Printer {
  private printHeader : PrintHeader;
  constructor(printHeader? : PrintHeader) {
    this.printHeader = printHeader ? printHeader : new DefaultPrintHeader();
  }

  print() {
    this.printHeader.print();
  }
}

interface PrintHeader {
  print() : void
}

class DefaultPrintHeader implements PrintHeader {
  print() {
    console.log('기본 출력!');
  }
}

class RedPrintHeder implements PrintHeader {
  print() {
    console.log('🔴 출력!');
  }
}

class BlackPrintHeader implements PrintHeader {
  print() {
    console.log('⚫ 출력!');
  }
}

const printers = [ new Printer(), new Printer(new RedPrintHeder()), new Printer(new BlackPrintHeader())]

printers.forEach(printer => printer.print());