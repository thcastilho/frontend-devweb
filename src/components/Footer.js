import "../styles/Footer.modules.css"
import { MDBFooter } from "mdb-react-ui-kit"

export default function Footer() {
    return (
        <>
            <MDBFooter bgColor="#011C26">
                <div className="footer-txt">
                    <span>Desenvolvido por Gil de Almeida, Pedro Bruce e Thiago Castilho</span><br />
                    <span>@Copyright</span>
                </div>
            </MDBFooter>
        </>
    )
}