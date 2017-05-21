var errors = {
  firstHack: [
    { value: 'bash ERR! listen AddrInUse', type: 'error' },
    { value: 'bash ERR! Linux 3.13.0-88-generic', type: 'error' },
    { value: 'bash ERR! argv "/usr/local/bin" "/usr/local/bin/bash" "port" "flooded"', type: 'error' },
    { value: 'bash ERR! bash  v2.14.12', type: 'error' },
    { value: 'bash ERR! Server._listen2', type: 'error' },
    { value: 'bash ERR! code EAddrInUse ', type: 'error' },
    { value: 'bash ERR! errno -13', type: 'error' },
    { value: 'bash ERR! syscall port filled', type: 'error' },
    { value: 'bash ERR! port reponding', type: 'error' }
  ],
  firstMessage: {
    value: '01001000 01100101 01101100 01110000 00100000 01110100 01101000 01110011 00100000 01101001 01110011 00100000 01100100 01101001 01110011 01110100 01110010 01110011 00100000 01100011 01100001 01101100 01101100 00100001 00100000 01000011 01101110 01101110 01100011 01110100 00100000 00110010 00100000 00111001 00110111 00110010 00101110 00111000 00110001 00110110 00101110 00110010 00110000 00110011',
    type: 'error'
  }
};

export default errors;
