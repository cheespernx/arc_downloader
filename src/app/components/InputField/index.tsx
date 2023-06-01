"use client";
import { useCallback, useEffect, useState } from 'react';
import './styles.scss'
import TypeSwitch from '../Switch';

type URLType = 'Instagram' | 'Youtube' | null

const InputSearchField = () => {

  const [ isValidURL, setIsValidURL ] = useState<boolean>(false);
  const [ inputValue, SetInputValue ] = useState<string>('');
  const [ URLType, SetURLType ] = useState<URLType>(null);
  const [ switchHidden, SetSwitchHidden ] = useState<boolean>(false);

  const validateURL = useCallback( (URL: string) => {
    const URLRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

    if (URLRegex.test(URL)){
      if (
        (URL.includes('https://www.instagram.com/p/') && URL.length > 29) ||
        (URL.includes('https://instagram.com/p/') && URL.length > 25)
      ) {
        SetURLType('Instagram');
        setIsValidURL(true)
      } else if (
        (URL.includes('https://youtube.com/watch?v=') && URL.length > 29) ||
        (URL.includes('https://m.youtube.com/watch?v=')&& URL.length > 31) ||
        (URL.includes('https://www.youtube.com/watch?v=')&& URL.length > 33)
      ){
        SetURLType('Youtube');
        setIsValidURL(true)
      } else {
        SetURLType(null);
        setIsValidURL(false)
      }
    } else {
      SetURLType(null);
      setIsValidURL(false)
    }
  }, [])

  useEffect(() => {
    if (!!inputValue && inputValue.length > 10) {
      validateURL(inputValue);
    } else {
      SetURLType(null);
      setIsValidURL(false)
    }
  }, [inputValue, validateURL])

  useEffect(() => {
    if (URLType === 'Youtube') {
      SetSwitchHidden(false);
    } else {
      SetSwitchHidden(true);
    }
  }, [URLType])

  const startDownloadProcess = () => {
    console.log(inputValue);
  }

  return(
    <div className="container">
      <div className="input-search-container">
        <input 
          type="text" 
          placeholder="Paste the link" 
          value={inputValue} 
          onChange={(event) => SetInputValue(event.target.value.replace(/\s/g, ''))}
        />
        <button disabled={!isValidURL} onClick={startDownloadProcess}>
          Download
        </button>
      </div>
      <TypeSwitch hidden={switchHidden}/>
    </div>
  )
}

export default InputSearchField;