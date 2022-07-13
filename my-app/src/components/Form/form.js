import React from "react";
import { useState } from "react";
import "./form.css"
import hex2rgb from "./converter"
// import PropTypes from "prop-types";
// import UserModel from "../models/UserModel";

let rgbValue = 'rgb(52,73,94)'; // начальное значение RGB-кода
let hexValue ='#34495e';        // начальное значение HEX-кода

export default function Form() {  // КОМПОНЕНТ Формы
  
  const [form, setForm] = useState({ // перечисляем все изменяемые параметры внутри формы
    hex_code: '#34495e',
    rgb_code: '',
    hex_parametr: {backgroundColor: "#34495e" },  // перекрашивание фона всей страницы
    rgb_parametr: {backgroundColor: "rgb(52,73,94)" } // перекрашивание нижней части формы
  });

    document.addEventListener("DOMContentLoaded", () => {
      document.querySelector('input').focus();
    });
      
  const handleCodeChange = evt => { // функция обработки набора символов внутри input-а
    
    setForm(prevForm => ({...prevForm, hex_code: evt.target.value}));

    if ((!(/^#/gm.test(evt.target.value))) || // проверка выражения по условию "код начинаться не с символа '#' "
       ((!(/^[#][0-9A-F]{6}/gmi.test(evt.target.value))) && 
       evt.target.value.length === 7) ||  // или по условию "код 7 символов, но НЕ корректный"
       (evt.target.value.length > 7 )  // или к начальному дефолтному значению добавлен/ны ещё символы
       ) { 
      const hexItem = {backgroundColor: '#ff0000'};
      setForm(prevForm => ({...prevForm, rgb_code: 'ERROR!'}));
      setForm(prevForm => ({...prevForm, hex_code: ''}));
      setForm(prevForm => ({...prevForm, hex_parametr: hexItem}));
      hexValue = '';
      } else setForm(prevForm => ({...prevForm, rgb_code: ''}));
    
    if ((/^[#][0-9A-F]{6}/gmi.test(evt.target.value)) && evt.target.value.length === 7) { // если в поле "input" набран корректный код (длиной 7 символов)
      
      rgbValue = hex2rgb(evt.target.value); // КОНВЕРТИРОВАНИЕ HEX в RGB

      setForm(prevForm => ({...prevForm, hex_code: ''}));
      setForm(prevForm => ({...prevForm, rgb_code: rgbValue}));

      const hexItem = {backgroundColor: evt.target.value}
      setForm(prevForm => ({...prevForm, hex_parametr: hexItem}));
      
      const rgbItem = {backgroundColor: rgbValue}
      setForm(prevForm => ({...prevForm, rgb_parametr: rgbItem}));
    }
    hexValue = evt.target.value;
    console.log('current hexValue = ', evt.target.value); //КОНТРОЛЬНАЯ ТОЧКА
  }
  
  const handleSubmit = evt => { // обработка нажатия "Enter"
    evt.preventDefault();
    if ((/^[#][0-9A-F]{6}/gmi.test(hexValue)) && hexValue.length === 7) { // если в поле "input" набран корректный код (длиной 7 символов)
      console.log('correct enter hexValue = ', hexValue); //КОНТРОЛЬНАЯ ТОЧКА
      setForm(prevForm => ({...prevForm, hex_code: ''}));

      const hexItem = {backgroundColor: hexValue}
      setForm(prevForm => ({...prevForm, hex_parametr: hexItem}));

      rgbValue = hex2rgb(hexValue); // КОНВЕРТИРОВАНИЕ HEX в RGB

      const rgbItem = {backgroundColor: rgbValue}
      setForm(prevForm => ({...prevForm, rgb_parametr: rgbItem}));
      
      setForm(prevForm => ({...prevForm, rgb_code: rgbValue}));
    };

    if ((!(/^[#][0-9A-F]{6}/gmi.test(hexValue)))) { // если в поле "input" набран НЕ корректный код (длиной 7 символов)
       
      console.log('wrong enter hexValue = ', hexValue); //КОНТРОЛЬНАЯ ТОЧКА
      const hexItem = {backgroundColor: '#ff0000'};
      setForm(prevForm => ({...prevForm, rgb_code: 'ERROR!'}));
      setForm(prevForm => ({...prevForm, hex_code: ''}));
      setForm(prevForm => ({...prevForm, hex_parametr: hexItem}));
    }
  }

  return (
    <label htmlFor="hex_parametr">
    <div className="Form-container" name="hex_parametr" style={form.hex_parametr}>
      <form className="Form-form" onSubmit={handleSubmit}>
        <label htmlFor="hex_code">
          <input 
            name="hex_code"
            value={form.hex_code}
            onChange={handleCodeChange}
          />
        </label>
        <div className="rgbField" htmlFor="rgb_parametr" name="rgb_parametr" style={form.rgb_parametr}>
          <div  htmlFor="rgb_code">
            <p name="rgb_code">{form.rgb_code}</p>
          </div>
        </div>
      </form>
    </div>
    </label>
  );
};

Form.defaultProps = {
  dataArr: []
  };

/*
ShopItemFunc.propTypes = {
  itemArray: PropTypes.arrayOf(UserModel).isRequired
}
*/