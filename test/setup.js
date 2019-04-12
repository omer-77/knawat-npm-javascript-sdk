import MP from '../src/index.js';

MP.baseUrl = 'https://dev.mp.knawat.io/api';
const instance = {
  key: 'ffdc11c6-b31c-4f81-8f67-468cf776e096',
  secret: 'b86820ca-ac8c-4af8-ba86-340d57036de7',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmZGMxMWM2LWIzMWMtNGY4MS04ZjY3LTQ2OGNmNzc2ZTA5NiIsImV4cCI6MTU2MDA4NTQ0NCwiaWF0IjoxNTU0OTAxNDQ0fQ.OeDcUrinNmhxxzutza0u0Uz3Tw_AOJxJJTveGXQJ07I'
};
const mp = new MP(instance);
export default mp;
