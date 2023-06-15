"use client";
import { useCallback, useEffect, useState } from 'react';
import './styles.scss'
import TypeSwitch from '../Switch';
import axios from 'axios';

const URLTypes = {
  Youtube: 'Youtube',
  Instagram: 'Instagram',
  null: null
} as const

type URLTypes = typeof URLTypes[keyof typeof URLTypes]

const InputSearchField = () => {

  const [ isValidURL, setIsValidURL ] = useState<boolean>(false);
  const [ inputValue, SetInputValue ] = useState<string>('');
  const [ URLType, SetURLType ] = useState<URLTypes>(null);
  const [ switchHidden, SetSwitchHidden ] = useState<boolean>(false);

  const validateURL = useCallback( (URL: string) => {
    const URLRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

    if (URLRegex.test(URL)){
      if (
        (URL.includes('https://www.instagram.com/p/') && URL.length > 29) ||
        (URL.includes('https://instagram.com/p/') && URL.length > 25) ||
        (URL.includes('https://www.instagram.com/reel/') && URL.length > 28) ||
        (URL.includes('https://instagram.com/reel/') && URL.length > 28)
      ) {
        SetURLType(URLTypes.Instagram);
        setIsValidURL(true)
      } else if (
        (URL.includes('https://youtube.com/watch?v=') && URL.length > 29) ||
        (URL.includes('https://m.youtube.com/watch?v=')&& URL.length > 31) ||
        (URL.includes('https://www.youtube.com/watch?v=')&& URL.length > 33)
      ){
        SetURLType(URLTypes.Youtube);
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
    if (URLType === URLTypes.Youtube) {
      SetSwitchHidden(false);
    } else {
      SetSwitchHidden(true);
    }
  }, [URLType])

  const startDownloadProcess = async () => {

    switch (URLType) {
      case URLTypes.Youtube:
        console.log('Youtube');
        break;
      case URLTypes.Instagram:
        const _urlParsed: string[] = inputValue.split('.com/');
        const postCode: string = _urlParsed[1].split('/')[1];

        const encodedParams = new URLSearchParams();
        encodedParams.set('url', postCode);

        const options = {
          method: 'GET',
          url: process.env.NEXT_PUBLIC_RAPID_API_URL,
          params: {
            short_code: postCode
          },
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
          }
        };

        try {
          const response = await axios.request(options);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }

        break;
    
      default:
        break;
    }
    
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