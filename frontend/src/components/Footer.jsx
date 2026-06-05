import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🧗 PresaClimb</span>
          <p className="footer__tagline">
            Tu tienda de confianza para presas de escalada. Calidad que se siente en cada agarre.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Categorías</h4>
            <a href="/?categoria=Slopers">Slopers</a>
            <a href="/?categoria=Regletas">Regletas</a>
            <a href="/?categoria=Jugs">Jugs</a>
            <a href="/?categoria=Volúmenes">Volúmenes</a>
          </div>
          <div className="footer__col">
            <h4>Ayuda</h4>
            <a href="#">Envíos</a>
            <a href="#">Devoluciones</a>
            <a href="#">Contacto</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} PresaClimb. Hecho para la comunidad escaladora.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
