import React from 'react';

import {Button } from '@material-ui/core';

const Metamask = (props) => {
  const { setError, setEthereum, handleClose  } = props;
  const getWeb3 = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts' });
      setEthereum(window.ethereum)
      handleClose(true)
      return
    }
    setError("No metamask")
  }
  return (
    <Button variant="contained" color="primary" onClick={() => getWeb3()}>
      Metamask
    </Button>
  )
}

export default Metamask