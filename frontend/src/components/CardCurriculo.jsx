const CardCurriculo = ({ nome, cargo }) => (
  <div className="p-4 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
    <h2 className="font-bold">{nome}</h2>
    <p>{cargo}</p>
  </div>
);

export default CardCurriculo;
