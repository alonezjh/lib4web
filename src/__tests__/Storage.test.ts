import 'jest-localstorage-mock';
import Storage from '../storage'

afterEach( () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
});

test('save to localStorage', () => {
  
  const ls = new Storage({});

  // String
  ls.set('string', 'string');
  expect(window.localStorage.getItem('string')).toEqual('string');
  expect(ls.get('string')).toEqual('string');

  // Number
  ls.set('number', 520);
  expect(window.localStorage.getItem('number')).toEqual('520');
  expect(ls.get('number')).toEqual(520);

  // Boolean
  ls.set('boolean', true);
  expect(window.localStorage.getItem('boolean')).toEqual('true');
  expect(ls.get('boolean')).toEqual(true);

  // Array
  ls.set('array', []);
  expect(window.localStorage.getItem('array')).toEqual('[]');
  expect(ls.get('array')).toEqual([]);

  // Object
  ls.set('object', {});
  expect(window.localStorage.getItem('object')).toEqual('{}');
  expect(ls.get('object')).toEqual({});

});

test('save to sessionStorage', () => {
  
  const ss = new Storage({driver:'session'});

  // String
  ss.set('string', 'string');
  expect(window.sessionStorage.getItem('string')).toEqual('string');
  expect(ss.get('string')).toEqual('string');

  // Number
  ss.set('number', 520);
  expect(window.sessionStorage.getItem('number')).toEqual('520');
  expect(ss.get('number')).toEqual(520);

  // Boolean
  ss.set('boolean', true);
  expect(window.sessionStorage.getItem('boolean')).toEqual('true');
  expect(ss.get('boolean')).toEqual(true);

  // Array
  ss.set('array', []);
  expect(window.sessionStorage.getItem('array')).toEqual('[]');
  expect(ss.get('array')).toEqual([]);

  // Object
  ss.set('object', {});
  expect(window.sessionStorage.getItem('object')).toEqual('{}');
  expect(ss.get('object')).toEqual({});

});

test('expire to localStorage', (done) => {
  
  const ls = new Storage({driver:'local', expire: 2000});

  ls.set('string', 'string');
  expect(window.localStorage.getItem('string')).toEqual('string');
  expect(ls.get('string')).toEqual('string');

  setTimeout( () => {
    expect(ls.get('string')).toEqual(null);
    done();
  }, 2000);

});

test('expire to sessionStorage', (done) => {
  
  const ss = new Storage({driver:'session', expire: 2000});

  ss.set('string', 'string');
  expect(window.sessionStorage.getItem('string')).toEqual('string');
  expect(ss.get('string')).toEqual('string');

  setTimeout( () => {
    expect(ss.get('string')).toEqual(null);
    done();
  }, 2000);

});

test('remove for localStorage', () => {
  const ls = new Storage({driver:'local'});
  ls.set('string', 'string');
  expect(window.localStorage.getItem('string')).toEqual('string');
  ls.remove('string');
  expect(window.localStorage.getItem('string')).toBeNull();

});

test('remove for sessionStorage', () => {
  const ss = new Storage({driver:'session'});
  ss.set('string', 'string');
  expect(window.sessionStorage.getItem('string')).toEqual('string');
  ss.remove('string');
  expect(window.sessionStorage.getItem('string')).toBeNull();

});

test('remove all', () => {
  const ls = new Storage({driver:'local'});
  const ss = new Storage({driver:'session'});
  ls.set('string', 'string');
  ss.set('string', 'string');
  expect(window.localStorage.getItem('string')).toEqual('string');
  expect(window.sessionStorage.getItem('string')).toEqual('string');
  ss.removeAll();
  expect(window.localStorage.getItem('string')).toBeNull();
  expect(window.sessionStorage.getItem('string')).toBeNull();

});

