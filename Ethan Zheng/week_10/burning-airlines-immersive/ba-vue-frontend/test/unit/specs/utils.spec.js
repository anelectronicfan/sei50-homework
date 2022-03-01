// ...and because you can only export ONE default,
// the name is irrelevant, and you can name it whatever
// you want when you import it
//import add, {subber} from '@/lib/utils';
// add them ALL as local variables with the same names
// into a local object called 'utils'
import * as utils from '@/lib/utils';

xdescribe('Utils library', () => {
  let result;
  beforeEach(() => {
    result = utils.adder(5,8);
  })

  describe('adder', () => {
    it('should add two numbers correctly', () => {
      // console.log('Does this work?')
      // console.log('utils:', utils)
      
      expect(result).to.equal(13);
    })
    it('should return a number', () => {
      
      expect(typeof result).to.equal('number');
    })
    
  })

  describe('subber', () => {
    it('should subtract two numbers correctly', () => {
      // console.log('Does this work?')
      const subResult = utils.subber(8, 3);
      expect(subResult).to.equal(5);
    })
    
  })
});
