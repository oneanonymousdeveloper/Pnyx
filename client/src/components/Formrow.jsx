
const Formrow = ({name, labelText, type, value, changeHandler}) => {
  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input type={type} name={name} id={name} value={value} onChange={changeHandler} required/>
    </div>
  )
}

export default Formrow
