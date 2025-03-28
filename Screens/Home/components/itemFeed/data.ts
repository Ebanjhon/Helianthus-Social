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
    url: 'https://storage.googleapis.com/myproject0810/uploads/1743150677240-264272_tiny.mp4?GoogleAccessId=firebase-adminsdk-fbsvc%40my-project-c7f44.iam.gserviceaccount.com&Expires=1898528400&Signature=HLJlIbVi3HTnlPBVbtYN1V0wv0deKRPHK88eBpUYpVMV8WeNEwll1MUUMapZs%2BoiNj08S54R5%2B%2FBixJL6CulMIcQNsL8S1PcvnVhgbbRMiBtC7UQhQpkzw1TbxLvJN9XKa371xOD5Hfxyo1jZD0Rwl5Nld0EsY6ivrVlrR0BlQktdjIvitijN1xZY6eHFfC%2B9vU7VekHroP8BdfFWxvwoPwVOHWk7k6kP%2Bi75RBm39CoLkvdv5vYO3JBv4vZipVYvJxzUaYYk8mTLJ3xcs%2FA6B1DUXo5zsy1r7g7NrJJctJPGU70KzdI33PmsBSikaJ%2Fcc0wBUv6CdSzQ1xTNRxpnA%3D%3D',
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
