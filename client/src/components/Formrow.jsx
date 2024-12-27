const Formrow = ({ name, labelText, type, value, changeHandler }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {labelText}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={changeHandler}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default Formrow;
