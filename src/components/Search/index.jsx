import styles from './Search.module.scss';
import iconSearch from '../../assets/img/icon-seacrh.svg';
import iconCloseInput from '../../assets/img/icon-close-input.png';
import { useCallback, useContext, useRef, useState } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {

  const [value, setValue] = useState('')
  const {valueInputSearch, setValueInputSearch} = useContext(SearchContext)
  
  const inputRef = useRef() // initialValue
  
  // const onDebounce = useCallback(debounce(() => {
   
  //   console.log('HELLO')
  // }, 1000), [])
 const onClickClear = () => {
  // document.querySelector('input').focus();
  inputRef.current.focus();
  setValue('');
  setValueInputSearch('');
 }
 //return function, but useeEffect do only call
  const updateSearchValue = useCallback(debounce((str)=> {
    //console.log(str)
    setValueInputSearch(str)
  }, 1000), [])

   const onChangeInputWithDebounce = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  
   } 
  
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={iconSearch} alt="icon-search"></img>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInputWithDebounce}
        className={styles.input}
        placeholder="Search pizza . . . "></input>
      {value && (
        <img
          onClick={onClickClear}
          className={styles.clearIcon}
          alt="clear-icon"
          src={iconCloseInput}></img>
      )}
    </div>
  );
};

export default Search;
