import "../css/Form.css"

const Form = ({ id, setId, pw, setPw }) => {
  return (
    <form className="login-form">
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
    </form>
  );
};

export default Form;
