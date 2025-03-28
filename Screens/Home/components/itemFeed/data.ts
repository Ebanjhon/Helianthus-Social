type media = {
  id: string;
  url: string;
  width: number;
  height: number;
  typeMedia: 'IMAGE' | 'VIDEO';
};

const dataResource: media[] = [
  {
    id: '1',
    url: 'https://i.pinimg.com/736x/dd/e4/f8/dde4f84e6d55d034a4d3c5c242901bf6.jpg',
    width: 800,
    height: 600,
    typeMedia: 'IMAGE',
  },
  {
    id: '2',
    url: 'https://i.pinimg.com/736x/41/5c/c4/415cc42aedf1adf8b391439945005767.jpg',
    width: 700,
    height: 500,
    typeMedia: 'IMAGE',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/myproject0810/uploads/1743137199791-3833491-hd_1080_1920_30fps.mp4?GoogleAccessId=firebase-adminsdk-fbsvc%40my-project-c7f44.iam.gserviceaccount.com&Expires=1898528400&Signature=I8u6FlMWE1EVhYWCHzO8IR0EXw0x3XLPkEr2QhXoabhFsIrUslPz3ID5t%2BVv%2F7J9tpajZU8g389W2lTsHOMSQZOJQvnm5zsueqVhey%2FGrgAnr2q9bKNcwiB6uow2SHJaZKaf8ntYuhlj%2FC%2Fyq6Lyn5rJbwlckIulERaA7ljTYSp98Ee%2B4pqpPWpHvkVpDmnKYrPQ11yey6L6mab4M8W4Np8GyrF8MPE7JijtqfPME9kBOf1y9QhB2LQSPttYwjFTR7mmGya4OMq%2BE%2BKXNW2XW6YVqtjZr35P%2F%2FH%2F%2FNMFu3teoj%2FMkfoMnVxPd1o1qHkT6C3LHAXMkBR2LJG8sdoGdA%3D%3D',
    width: 1280,
    height: 720,
    typeMedia: 'VIDEO',
  },
  {
    id: '4',
    url: 'https://i.pinimg.com/736x/44/1d/61/441d619dca7dafbe2e688e13f95997e0.jpg',
    width: 900,
    height: 400,
    typeMedia: 'IMAGE',
  },
  {
    id: '5',
    url: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
    width: 1920,
    height: 1080,
    typeMedia: 'VIDEO',
  },
];

export default dataResource;
