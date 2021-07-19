import React from 'react';
import {LoadingCircle} from "./ui/Preloader/LoadingCircle";

const Form = ({form, title, onChangeFiled, onSubmit, disabled, buttonName = 'Сохранить'}) => <div className="card">
    <h4>{title}</h4>
    <div>
        {form.map(field => <div key={field.id}>
            <label htmlFor={field.name}>{field.placeholder}</label>
            <input
                id={field.name}
                name={field.name}
                type={field.type}
                onChange={onChangeFiled}
                className="validate"/>
            {field.validate && <span className="helper-text" style={{color: 'red'}}>{field.validate}</span>}
        </div>)}
    </div>
    {disabled
        ? <a style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
             className="waves-effect waves-light btn"><LoadingCircle size={'20px'} color={'#fff'}/></a>
        : <a onClick={onSubmit} className="waves-effect waves-light btn">{buttonName}</a>}

</div>

export default Form;
