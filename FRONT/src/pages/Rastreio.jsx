import logo from '../assets/logo.svg';

function Rastreio() {

  return (
    <div>
        <div>
            <div>
                <p></p>
            </div>
            <div>
                <img src={logo} alt="" />
            </div>
        </div>
        <div>
            <div>
                <div>Produtos</div>
                <div>Pendente</div>
            </div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <progress className='border' value={50} max={100}></progress>
                </div>
            </div>
            <div>
                <p>Olá, Manassés!</p>
            </div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Rastreio;