import fs from 'fs';

// 1. run 함수를 만들어서 node의 디펜던시 제거
run(process.argv);

function run(args) {
  const command = parseCommand(args);
  const ordersLength = countOrders(command);
  console.log(ordersLength);
}

function parseCommand(args) {
  const fileName = args[2];

  if (!fileName) {
    throw new Error('파일 이름을 입력하세요');
  }

  const filePath = `./${fileName}.json`;

  if (!fs.existsSync(filePath)) {
    throw new Error('파일이 존재하지 않습니다');
  }
  return {
    filePath: filePath,
    countReadOnly: args.includes('-r'),
  };
}

function countOrders({ filePath, countReadOnly }) {
  const orders = parseOrdersFromFile(filePath);

  return countReadOnly ? orders.filter((order) => order.status === 'ready').length : orders.length;
}

function parseOrdersFromFile(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}
