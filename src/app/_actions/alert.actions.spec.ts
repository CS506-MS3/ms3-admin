import * as AlertActions from './alert.actions';

describe('Alert Actions', () => {
  describe('SetInfo', () => {
    it('should have type SET_INFO and require a string payload', () => {
      const message = 'test';
      const action = new AlertActions.SetInfo(message);

      expect(action.type).toEqual(AlertActions.SET_INFO);
    });
  });

  describe('SetError', () => {
    it('should have type SET_ERROR and require a string payload', () => {
      const message = 'test';
      const action = new AlertActions.SetError(message);

      expect(action.type).toEqual(AlertActions.SET_ERROR);
    });
  });

  describe('SetInfo', () => {
    it('should have type CLEAR', () => {
      const action = new AlertActions.Clear();

      expect(action.type).toEqual(AlertActions.CLEAR);
    });
  });
});
