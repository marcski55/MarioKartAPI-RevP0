import { KartDao } from '../../../src/daos/Kart/KartDao';
import { IKart } from '../../../src/entities/Kart';
const kartDao = new KartDao();

let data : IKart;

beforeAll(async () => {
  data = await JSON.parse(JSON.stringify(kartDao.getKartDB("Standard Kart")));
  console.log(data);
})

describe('Get known kart information from table', () => {
  it("Should return data for Standard Kart (ID = 0)",  () => {
    expect(data)
      .toMatchObject({"name":"Standard Kart","type":"Kart","speed":0,"acceleration":0,"weight":0,"handling":0,"traction":0,"miniTraction":0});
  });
});